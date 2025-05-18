<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Inertia\Inertia;
use Illuminate\Http\Request;

class JobController extends Controller {
    public function index() {
        $jobs = Job::latest()->get();
        return Inertia::render('Jobs/Index', [ 'jobs' => $jobs ]);
    }
}
