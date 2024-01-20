<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    public function get_driver_location(Request $request){
        $driver_id = Driver::find(1);
        $driver_id = $driver_id->id;
        $location = Location::create([
            'driver_id'=>$driver_id,
            'longitude'=>$request->longitude,
            'latitude'=>$request->latitude
        ]);
    }
}
