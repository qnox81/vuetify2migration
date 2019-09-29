<?php

namespace App\Providers;

use Dps\Cm\Snmp;
use Illuminate\Support\ServiceProvider;

class DpsServiceProvider extends ServiceProvider {

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Snmp::class, function ()
        {
            return new Snmp();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
