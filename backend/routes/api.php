<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusesController;
use App\Http\Controllers\DriversController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\RidesController;
use App\Http\Controllers\SeatsController;
use App\Http\Controllers\ZonesController;
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
Route::group(["middleware"=>['auth:api', 'passenger']], function () {
Route::controller(RidesController::class)->group(function () {
    Route::post('add/ride', 'create_ride');
    Route::post('end/ride', 'end_ride');
    Route::post('feedback/ride', 'add_feedback');

});

})->middleware(['auth:api', 'passenger']);

Route::post('update/seat',[SeatsController::class,'updateStatus']);
Route::get('get/seat',[SeatsController::class,'get_seats']);
Route::post('driver/location',[LocationsController::class,'create_driver_location']);
Route::post('update/location',[LocationsController::class,'update_driver_location']);
Route::delete('delete/location',[LocationsController::class,'delete_driver_location']);
Route::get('get/driver/location',[LocationsController::class,'get_driver_locations']);


Route::get('/driver/bus/{driver_id}',[BusesController::class,'getBusAndDriver']);


Route::controller(DriversController::class)->group(function () {
    Route::get('/driver/{userId}', 'getDriverByUserId');
});

Route::group(["middleware" => ['auth:api', 'admin']], function () {
Route::controller(BusesController::class)->group(function () {
    Route::post('register/bus', 'create_bus');
    Route::get('all/buses', 'getAllBuses');
    Route::get('/bus', 'getAllBusesAndDriver');
    Route::get('/bus/zone/{id}','getBusesByZone');
    Route::get('/free/buses','getFreeBuses');

});
Route::controller(DriversController::class)->group(function () {
    Route::post('register/driver', 'create_driver');
    Route::delete('/delete/driver/{userId}', 'deleteDriverByUserId');
    Route::get('all/drivers', 'getAllDrivers');
    Route::get('/driver/{userId}', 'getDriverByUserId');

});

Route::controller(ZonesController::class)->group(function(){
    Route::get('/zones','all_zones');
    Route::post('/addzone','add_zone');
});

Route::get('/feedback',[RidesController::class,'get_feedback']);
})->middleware(['auth:api', 'admin']);
