<?php

namespace App\Services;

use App\Models\Menu;
use Illuminate\Support\Facades\Cache;

class MenuService
{
    public function getTree(): array
    {
        return Cache::remember('menu.tree', now()->addHours(24), function () {
            $flat = Menu::orderBy('order')->get();
            return $this->buildTree($flat);
        });
    }

    private function buildTree($items, $parentId = null): array
    {
        $branch = [];
        foreach ($items as $item) {
            if ($item->parent_id == $parentId) {
                $children = $this->buildTree($items, $item->id);
                
                $node = $item->only(['id', 'title', 'route_name', 'url', 'permission_name']);
                
                // Резолвим Laravel-роут в полный URL
//                $node['href'] = $item->route_name ? route($item->route_name) : $item->url;
                $node['href'] = $item->url;
                
                if (!empty($children)) {
                    $node['children'] = $children;
                }
                
                $branch[] = $node;
            }
        }
        return $branch;
    }

    public function clearCache(): void
    {
        Cache::forget('menu.tree');
    }
}