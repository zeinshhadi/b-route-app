<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusesController;
use App\Http\Controllers\DriversController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});
Route::controller(DriversController::class)->group(function () {
    Route::post('register/driver', 'create_driver');

});
Route::controller(BusesController::class)->group(function () {
    Route::post('register/bus', 'create_bus');

});

