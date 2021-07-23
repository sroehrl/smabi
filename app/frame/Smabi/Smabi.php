<?php
/**
 * Created by neoan3-cli.
 */

namespace Neoan3\Frame;

use Exception;
use Neoan3\Core\Serve;
use Neoan3\Provider\MySql\Database;
use Neoan3\Provider\MySql\DatabaseWrapper;

/**
 * Class smabi
 * @package Neoan3\Frame
 */
class Smabi extends Serve
{
    /**
     * Db credential name
     * @var string
     */
    private string $dbCredentials = 'testing_db';
    /**
     * @var Database|DatabaseWrapper
     */
    public Database $db;

    /**
     * Demo constructor.
     * @param Database|null $db
     * @throws Exception
     */
    function __construct(Database $db = null)
    {
        parent::__construct();
        $this->assignProvider('db', $db, function(){
            $credentials = getCredentials();
            $this->provider['db'] = new DatabaseWrapper($credentials[$this->dbCredentials]);
        });
    }

    /**
     * Overwriting Serve's constants()
     * @return array
     */
    function constants()
    {
        return [
            'base' => [base],
            'link' => [
                [
                    'sizes' => '32x32',
                    'type' => 'image/png',
                    'rel' => 'icon',
                    'href' => 'asset/neoan-favicon.png'
                ]
            ],
            'stylesheet' => [
                'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
            ]
        ];
    }
}
