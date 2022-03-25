<?php
/**
 * Created by neoan3-cli.
 */

namespace Neoan3\Frame;

use Exception;
use Neoan3\Core\RouteException;
use Neoan3\Core\Serve;
use Neoan3\Provider\Attributes\UseAttributes;
use Neoan3\Provider\Auth\Auth;
use Neoan3\Provider\Auth\AuthObjectDeclaration;
use Neoan3\Provider\Auth\JwtWrapper;
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
    private string $dbCredentials = 'neoan3_db';

    private string $jwtCredentials = 'auth';
    /**
     * @var DatabaseWrapper
     */
    public DatabaseWrapper $db;

    public Auth $auth;
    private ?AuthObjectDeclaration $authObject;

    /**
     * Demo constructor.
     * @param Database|null $db
     * @throws Exception
     */
    function __construct(Database $db = null, Auth $auth = null)
    {
        parent::__construct();
        $credentials = getCredentials();
        $this->assignProvider('db', $db, function() use ($credentials){

            $this->provider['db'] = new DatabaseWrapper($credentials[$this->dbCredentials]);
//            $this->provider['db']->setEnvironment(['']);
        });
        $this->assignProvider('auth', $auth, function () use ($credentials){
            $this->provider['auth'] = new JwtWrapper();
            $this->provider['auth']->setSecret($credentials[$this->jwtCredentials]['secret']);
            $this->auth = $this->provider['auth'];
        });
        if(PHP_MAJOR_VERSION >= 8){
            $phpAttributes = new UseAttributes();
            $phpAttributes->hookAttributes($this->provider);
            $this->authObject = $phpAttributes->authObject;
        }
    }

    /**
     * @throws RouteException
     */
    function throwException(string $msg = 'Unauthorized', int $code = 401)
    {
        throw new RouteException($msg,$code);
    }

    /**
     * @throws RouteException
     */
    function verifyBody($required, $body)
    {
        foreach ($required as $item){
            if(!isset($body[$item])){
                $this->throwException("missing property '$item'", 400);
            }
        }
    }

    /**
     * Overwriting Serve's constants()
     * @return array
     */
    function constants(): array
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
            ]

        ];
    }
}
