<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post; // Assuming you have a Post model
use App\Models\User; // Assuming you have a User model
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->paginate(10); // Adjust pagination as needed
        return Inertia::render('Home', ['posts' => $posts]);
    }
}
