<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\MenuService;
use App\Models\ClientsCardRequest;

class KartyController extends Controller
{
    public function index()
    {
        return Inertia::render('Karty/index');
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fio' => 'required|string|max:255',
            'type_card' => 'required|string|in:debit,credit,business',
        ]);

        ClientsCardRequest::create($validated);
        $testVariable = 'test';

        return back()->with([
            'success' => [
                'message' => '✅ Заявка успешно отправлена!',
                'id' => now()->timestamp
                ],
            'testVariable' => $testVariable,
        ]);
    }
}
