<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Services\MenuService;
use App\Services\CityService;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        Inertia::share([
            'menuTree' => fn () => app(MenuService::class)->getTree(),
            'geo' => fn() => [
                'cities'       => app(CityService::class)->getActiveForFrontend(),
                'selectedCity' => fn() => app(CityService::class)->findById(request()->session()->get('city_id')),
            ],
//            'cities' => fn () => [['id' => 0, 'name' => 'Москва'], ['id' => 1, 'name' => 'Санкт-Петербург'], ['id' => 2, 'name' => 'Казань']],
        ]);
    }
}
