<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        if (Auth::check()) {
            return new UserResource(Auth::user());
        }

        return response()->json([
            'message' => 'Unauthenticated.'
        ], 401);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($validated, true)) {
            return new UserResource(Auth::user());
        }

        return response()->json([
            'message' => 'Incorrect email or password.'
        ], 401);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        Auth::login($user, true);

        return (new UserResource(Auth::user()))
            ->response()
            ->setStatusCode(201);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
