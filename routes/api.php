<?php

use App\Http\Controllers\Api\ScoreController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authentication routes

Route::prefix('auth')->group(function () {
    Route::get('authenticate', [AuthController::class, 'authenticate'])->name('api.auth.authenticate');
    Route::post('login', [AuthController::class, 'login'])->name('api.auth.login');
    Route::post('register', [AuthController::class, 'register'])->name('api.auth.register');
    Route::post('logout', [AuthController::class, 'logout'])->name('api.auth.logout');
});


// Regular routes

Route::prefix('scores/{score:hash}')->group(function () {
    Route::get('', [ScoreController::class, 'show'])->name('api.scores.show');
});


// Authenticated routes

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('user')->group(function () {
        Route::patch('', [UserController::class, 'update'])->name('api.user.update');
        Route::patch('password', [UserController::class, 'updatePassword'])->name('api.user.password');
    });

    Route::prefix('scores')->group(function () {
        Route::get('', [ScoreController::class, 'index'])->name('api.scores.index');
        Route::post('', [ScoreController::class, 'create'])->name('api.scores.create');
    });

    Route::prefix('scores/{score:hash}')->group(function () {
        Route::patch('', [ScoreController::class, 'update'])
             ->middleware('can:update,score')
             ->name('api.scores.update');

        Route::delete('', [ScoreController::class, 'delete'])
             ->middleware('can:delete,score')
             ->name('api.scores.delete');
    });
});
