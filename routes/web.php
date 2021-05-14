<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', [AppController::class, 'root'])->name('root');

Route::get('login', [AppController::class, 'app'])
     ->middleware('guest')
     ->name('login');
Route::get('register', [AppController::class, 'app'])
     ->middleware('guest')
     ->name('register');

Route::middleware('auth')->group(function () {
    Route::get('scores', [AppController::class, 'app'])->name('scores');
});

Route::get('/{any}', [AppController::class, 'app'])
    ->where('any', '.*')
    ->name('app');
