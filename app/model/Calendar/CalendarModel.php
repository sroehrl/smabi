<?php
/* Generated by neoan3-cli */

namespace Neoan3\Model\Calendar;

use Neoan3\Provider\MySql\Database;
use Neoan3\Provider\Model\Model;
use Neoan3\Provider\MySql\Transform;

/**
 * Class CalendarModel
 * @package Neoan3\Model\Calendar
 * @method static get(string $id)
 * @method static create(array $modelArray)
 * @method static update(array $modelArray)
 * @method static find(array $conditionArray)
 * @method static delete(string $id, bool $hard = false)
 */

class CalendarModel implements Model{

    /**
     * @var Database|null
     */
    private static ?Database $db = null;

    /**
     * @param $method
     * @param $args
     * @return mixed
     */
    public static function __callStatic($method, $args)
    {
        if(!method_exists(self::class, $method)){
            $transform = new Transform('calendar', self::$db);
            return $transform->$method(...$args);
        } else {
            return self::$method(...$args);
        }
    }
    public static function range($from)
    {
        $res = [];
        $fromDate = date('Y-m-d', $from/1000);
        $toDate = date('Y-m-d', strtotime('+1 months', $from/1000));
        $ids = self::$db->smart('>SELECT id from calendar WHERE start_date > {{from}} AND start_date < {{to}} AND delete_date IS NULL', [
            'from'=> $fromDate,
            'to' => $toDate
        ]);
        foreach ($ids as $id){
            $res[] = self::get($id['id']);
        }
        return $res;
    }

    /**
     * @param array $providers
     */
    public static function init(array $providers)
    {
        foreach ($providers as $key => $provider){
            if($key === 'db'){
                self::$db = $provider;
            }
        }
    }

}