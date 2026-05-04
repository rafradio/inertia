<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    protected $table = "menu";
    
    protected $fillable = [
        'parent_id', 'title', 'route_name', 'url', 'permission_name', 'order'
    ];
    
    protected $casts = [
        'order' => 'integer',
        'parent_id' => 'integer',
    ];
    
    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
    
    public function children(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('order');
    }
    
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeWithChildren($query)
    {
        return $query->with('children');
    }
    
    public function allChildrenRecursive(): HasMany
    {
        return $this->children()->with('allChildrenRecursive');
    }
    
}
