<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BackendController extends Controller
{
    public function index()
    {
        return inertia('Backend/Dashboard', [
            'usersCount' => \App\Models\User::count(),
            'postsCount' => \App\Models\Post::count(),
        ]);
    }
}
