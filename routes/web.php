<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MenuCreateController;
use App\Http\Controllers\KartyController;

//Route::get('/', function () {
//    return Inertia::render('Menu/Index', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/', [MenuCreateController::class, 'index'])->name('home');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/menu', [MenuCreateController::class, 'index'])->name('menu.index');
    Route::get('/karty', [KartyController::class, 'index'])->name('karty.index');
    Route::post('/cardsrequest', [KartyController::class, 'store'])->name('karty.store');
});

require __DIR__.'/auth.php';
