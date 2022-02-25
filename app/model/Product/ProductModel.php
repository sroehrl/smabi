<?php
/* Generated by neoan3-cli */

namespace Neoan3\Model\Product;

use Neoan3\Provider\Model\Model;
use Neoan3\Provider\MySql\Database;
use Neoan3\Provider\MySql\Transform;

/**
 * Class ProductModel
 * @package Neoan3\Model\Product
 * @method static get(string $id)
 * @method static create(array $modelArray)
 * @method static update(array $modelArray)
 * @method static find(array $conditionArray)
 * @method static delete(string $id, bool $hard = false)
 */
class ProductModel implements Model
{

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
        if (!method_exists(self::class, $method)) {
            $transform = new Transform('product', self::$db);
            return $transform->$method(...$args);
        } else {
            return self::$method(...$args);
        }
    }

    public static function search(string $keyword): array
    {
        $values = [
            'pure' => $keyword,
            'keyword' => "%$keyword%"
        ];
        $ids = self::$db->smart('>SELECT id FROM product WHERE (id = UNHEX({{pure}}) OR name LIKE {{keyword}} OR description LIKE {{keyword}} OR product_number LIKE {{keyword}} OR category LIKE {{keyword}}) AND delete_date IS NULL ORDER BY name', $values);
        $results = [];
        foreach ($ids as $id) {
            $results[] = self::get($id['id']);
        }
        return $results;
    }

    /**
     * @param array $providers
     */
    public static function init(array $providers)
    {
        foreach ($providers as $key => $provider) {
            if ($key === 'db') {
                self::$db = $provider;
            }
        }
    }

}