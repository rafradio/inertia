<?php

namespace App\Services;

use App\Models\City;
use Illuminate\Support\Facades\Cache;

class CityService
{
    protected const CACHE_KEY = 'geo.cities.list';
    protected const CACHE_TTL = 360; // 6 мин

    /**
     * Получить список активных городов для фронтенда
     */
    public function getActiveForFrontend(): array
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            return City::active()
                ->get(['id', 'name', 'code'])
                ->map(fn($city) => [
                    'id'   => $city->id,
                    'name' => $city->name,
                    'code' => $city->code,
                    // 👇 Здесь можно добавить трансформации:
                    // 'flag' => $this->getFlagUrl($city->code),
                    // 'delivery_days' => $this->calcDelivery($city->id),
                ])
                ->all();
        });
    }

    /**
     * Получить город по ID с кешем
     */
    public function findById(?int $id): ?array
    {
        if (!$id) return null;
        
        return Cache::remember("geo.city.$id", self::CACHE_TTL, function () use ($id) {
            $city = City::active()->find($id);
            return $city ? [
                'id'   => $city->id,
                'name' => $city->name,
                'code' => $city->code,
            ] : null;
        });
    }

    /**
     * Поиск городов (для асинхронного поиска в дропдауне)
     */
    public function search(string $term, int $limit = 10): array
    {
        return City::active()
            ->search($term)
            ->limit($limit)
            ->get(['id', 'name'])
            ->toArray();
    }

    /**
     * Очистить кеш при изменении городов
     */
    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
        // Можно очистить все ключи по паттерну, если нужно
    }
}
