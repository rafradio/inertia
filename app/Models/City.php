<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;

class City extends Model
{
    protected $fillable = [
        'name',
        'code',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope: только активные города, отсортированные
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('name');
    }

    /**
     * Scope: поиск по названию
     */
    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where('name', 'LIKE', "%{$term}%");
    }

    /**
     * Accessor: название с заглавной буквы (если в БД хранится как есть)
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn($value) => ucfirst($value),
        );
    }
}