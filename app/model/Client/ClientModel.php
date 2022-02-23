<?php
/* Generated by neoan3-cli */

namespace Neoan3\Model\Client;

use Neoan3\Provider\MySql\Database;
use Neoan3\Provider\Model\Model;
use Neoan3\Provider\MySql\Transform;

/**
 * Class ClientModel
 * @package Neoan3\Model\Client
 * @method static get(string $id)
 * @method static create(array $modelArray)
 * @method static update(array $modelArray)
 * @method static find(array $conditionArray)
 * @method static delete(string $id, bool $hard = false)
 */

class ClientModel implements Model{

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
            $transform = new Transform('client', self::$db);
            return $transform->$method(...$args);
        } else {
            return self::$method(...$args);
        }
    }

    public static function search($keyword): array
    {
        $values = [
            'pure' => $keyword,
            'keyword' => "%$keyword%"
        ];
        $ids = self::$db->smart('>SELECT id FROM client WHERE delete_date IS NULL id = UNHEX({{pure}}) OR name LIKE {{keyword}} OR website LIKE {{keyword}} OR zip_code LIKE {{keyword}}', $values);
        $results = [];
        foreach ($ids as $id){
            $results[] = self::get($id['id']);
        }
        return $results;
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