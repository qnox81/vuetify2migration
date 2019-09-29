<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LoginController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
//    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

//    protected function sendFailedLoginResponse(Request $request)
//    {
//        throw new ApiLoginException([
//            $this->username() => [trans('auth.failed')],
//        ]);
//    }


    protected function attemptLogin(Request $request)
    {
//        dd(\App\Models\User::all()->toArray(), $this->credentials($request));
        $token = $this->guard()->attempt($this->credentials($request));

        if ($token)
        {
            $this->guard()->setToken($token);

            return true;
        }
        // @codeCoverageIgnoreStart
    }
    // @codeCoverageIgnoreEnd

    /**
     * Send the response after the user was authenticated.
     *
     * @param Request $request
     *
     * @return array
     */
    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        $token = (string) $this->guard()->getToken();
        $expiration = $this->guard()->getPayload()->get('exp');

        return [
            'token'      => $token,
            'token_type' => 'bearer',
            'expires_in' => $expiration - time(),
        ];
    }

    /**
     * Log the user out of the application.
     *
     * @param Request $request
     *
     * @return Response|void
     */
    public function logout(Request $request)
    {
        return $this->guard()->logout();
    }

}
