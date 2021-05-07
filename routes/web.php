<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DefaultController;
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

Route::get('', [DefaultController::class, 'app'])->name('app');
Route::get('login', [DefaultController::class, 'app'])->name('login');
Route::get('register', [DefaultController::class, 'app'])->name('register');

Route::get('score/{score}', [DefaultController::class, 'app'])->name('login');

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('logout')->name('auth.logout');
});

Route::fallback(fn() => view('404'));
