<?php

namespace Neoan3\Component\Auth;

use Neoan3\Frame\Smabi;
use Neoan3\Model\User\UserModel;
use Neoan3\Provider\Model\InitModel;

/**
 * Class AuthController
 * @package Neoan3\Component\Auth
 *
 * Generated by neoan3-cli for neoan3 v3.*
 */

class AuthController extends Smabi{

    /**
     * GET: api.v1/auth
     * GET: api.v1/auth/{id}
     * GET: api.v1/auth?{query-string}
     * @return array
     */
    #[InitModel(UserModel::class)]
    function getAuth(): array
    {
        $user = $this->auth->restrict();
        return [
            'user' => UserModel::get($user->getUserId())
        ];
    }

    /**
     * POST: api.v1/auth
     * @param bool|string $registering
     * @param array $body
     * @return array
     * @throws \Neoan3\Core\RouteException
     */
    #[InitModel(UserModel::class)]
    function postAuth(bool|string $registering = false, array $body = []): array
    {

        if($registering){
            $this->verifyBody(['email','password','tac'], $body);
            if(!$body['tac']){
                $this->throwException('Terms and Conditions not accepted', 400);
            }
            $user = UserModel::register($body);
        } else {
            $this->verifyBody(['email','password'], $body);
            $user = UserModel::login($body);
        }
        $jwt = $this->auth->assign($user['id'],'all', $user);
        return ['token'=> $jwt->getToken(), 'user' => $user];
    }

}