<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppController extends Controller
{
    public function app()
    {
        return view('app');
    }

    public function root()
    {
        if (Auth::check()) {
            return redirect()->route('scores');
        }

        return redirect()->route('login');
    }
}
