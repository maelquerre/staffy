<?php

use App\Http\Controllers\Api\ScoreController;
use App\Http\Controllers\AuthController;
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

Route::prefix('auth')->group(function () {
    Route::get('authenticate', [AuthController::class, 'authenticate'])->name('api.auth.authenticate');
    Route::post('login', [AuthController::class, 'login'])->name('api.auth.login');
    Route::post('register', [AuthController::class, 'register'])->name('api.auth.register');
    Route::post('logout', [AuthController::class, 'logout'])->name('api.auth.logout');
});

Route::get('scores', [ScoreController::class, 'index'])->name('api.scores.index');
Route::post('scores', [ScoreController::class, 'store'])->name('api.scores.store');

Route::prefix('scores/{score:hash}')->group(function () {
    Route::get('', [ScoreController::class, 'show'])->name('api.scores.show');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [ScoreController::class, 'index'])->name('api.scores.index');

    Route::prefix('scores/{score:hash}')->group(function () {
        Route::delete('', [ScoreController::class, 'delete'])->name('api.scores.delete');
    });
});
