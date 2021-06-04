<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return \App\Http\Resources\UserResource
     */
    public function show(Authenticatable $user)
    {
        return new UserResource($user);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return \App\Http\Resources\UserResource
     */
    public function update(Request $request, Authenticatable $user)
    {
        $validated = $request->validate([
            'name'  => 'string',
            'email' => 'email|unique:users,email',
        ]);

        $user->fill($validated);
        $user->save();

        return $this->show($user);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return \App\Http\Resources\UserResource
     */
    public function updatePassword(Request $request, Authenticatable $user)
    {
        $validated = $request->validate([
            'current_password' => 'required|string|password:sanctum',
            'new_password'     => 'required|string|confirmed',
        ]);

        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return $this->show($user);
    }

}
