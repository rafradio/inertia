<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            [
                'name'       => 'Москва',
                'code'       => 'MOW',
                'sort_order' => 1,
                'is_active'  => true,
            ],
            [
                'name'       => 'Санкт-Петербург',
                'code'       => 'SPB',
                'sort_order' => 2,
                'is_active'  => true,
            ],
            [
                'name'       => 'Казань',
                'code'       => 'KZN',
                'sort_order' => 3,
                'is_active'  => true,
            ],
        ];

        foreach ($cities as $city) {
            City::updateOrCreate(
                ['code' => $city['code']], // Уникальный ключ для поиска
                $city // Данные для обновления/создания
            );
        }
    }
}