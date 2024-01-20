<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationsController extends Controller
{
    public function get_driver_location(Request $request){

        $driver =Auth::user();
        $driver_id = $driver->id;

        $location = Location::create([
            'driver_id'=>$driver_id,
            'longitude'=>$request->longitude,
            'latitude'=>$request->latitude
        ]);

        return response()->json(['driver',$driver_id]);
    }

    public function update_driver_location(Request $request){

        $driver =Auth::user();
        $driver_id = $driver->id;

        $location = Location::where('driver_id',$driver_id)->update([
            'longitude'=>$request->longitude,
            'latitude'=>$request->latitude]);
    }
}
