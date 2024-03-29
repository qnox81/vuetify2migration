<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;

class BroadcastServiceProvider extends ServiceProvider {

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    // @codeCoverageIgnoreStart
    public function boot()
    {

        Broadcast::routes();

        require base_path('routes/channels.php');
    }
    // @codeCoverageIgnoreEnd
}
