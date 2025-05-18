<?php

namespace App\Http\Controllers;

use App\Models\Posta;
use Illuminate\Http\Request;

class PostaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Posta::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        $posta = Posta::create($fields);

        return [ 'posta' => $posta ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Posta $posta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Posta $posta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Posta $posta)
    {
        //
    }
}
