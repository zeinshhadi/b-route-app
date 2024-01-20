<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationsController extends Controller
{
    public function get_driver_location(Request $request){

        $user =Auth::user();
        $driver_id = Driver::where('user_id', $user->id)->first();
        $driver_id= $driver_id->id;
        if (!$user) {
            return response()->json(['no driver',$driver_id]);
        }
        $location = Location::create([
            'driver_id'=>$driver_id,
            'longitude'=>$request->longitude,
            'latitude'=>$request->latitude
        ]);
        if (!$location) {
           return response()->json(['fail']);
        }
            return response()->json(['driver',$driver_id]);
        }

    public function update_driver_location(Request $request){

        $user =Auth::user();
        $driver_id = Driver::where('user_id', $user->id)->first();
        $driver_id= $driver_id->id;

        $location = Location::where('driver_id',$driver_id)->update([
            'longitude'=>$request->longitude,
            'latitude'=>$request->latitude]);
                return response()->json([$location]);
    }

public function delete_driver_location(){
        $user =Auth::user();
        $driver_id = Driver::where('user_id', $user->id)->first();
        $driver_id= $driver_id->id;

        $location = Location::where('driver_id',$driver_id);
        $location->delete();
}
}
