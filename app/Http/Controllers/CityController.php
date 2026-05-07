<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CityService;

class CityController extends Controller
{
    public function update(Request $request, CityService $cityService)
    {
        $validated = $request->validate([
                'city_id' => 'required|exists:cities,id',
        ]);

        $request->session()->put('city_id', $validated['city_id']);
//        $cityService->clearCache();
//        $cities = [['id' => 0, 'name' => 'Москва'], ['id' => 1, 'name' => 'Санкт-Петербург'], ['id' => 2, 'name' => 'Казань']];
//        $request->session()->put('city_id', $cities[$request['city_id']]);

//        if ($request->user()) {
//            $request->user()->update(['city_id' => $validated['city_id']]);
//        }

        return back();
        
//        return back()->with('success', [
//            'message' => '📍 Город изменён',
//            'id' => now()->timestamp,
//        ]);
    }
}
