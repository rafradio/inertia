<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\MenuService;

class MenuCreateController extends Controller
{
    public function index(MenuService $menuService)
    {
        return Inertia::render('Menu/Index', [
            'menuTree' => $menuService->getTree(),
        ]);
    }
}
