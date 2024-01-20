<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationsController extends Controller
{
    public function create_driver_location(Request $request){

        $user =Auth::user();
        $driver_id = Driver::where('user_id', $user->id)->first();
        $driver_id= $driver_id->id;
        $location_found = Location::where('driver_id', $driver_id)->first();
        if(!$location_found){
                    if (!$user) {
            return response()->json(['no driver',$driver_id]);
        }
        $location = Location::create([
            'driver_id'=>$driver_id,
            'longitude'=>$request->lon,
            'latitude'=>$request->lat
        ]);
        if (!$location) {
           return response()->json(['fail']);
        }
            return response()->json(['location',$location]);
        }else{
             return response()->json(['fail',$location_found]);
        }

        }

    public function update_driver_location(Request $request){

        $user =Auth::user();
        $driver_id = Driver::where('user_id', $user->id)->first();
        $driver_id= $driver_id->id;
       
         $location = Location::where('driver_id',$driver_id)->first();
      
        $location->update([
            'longitude'=>$request->lon,
            'latitude'=>$request->lat]);
                return response()->json(['location updated',$location]);
    }

public function delete_driver_location(){
        $user =Auth::user();
        $driver_id = Driver::where('user_id', $user->id)->first();
        $driver_id= $driver_id->id;

        $location = Location::where('driver_id',$driver_id)->get()->first();
        $location->delete();
}

public function get_driver_locations(){
    
    $drivers = Driver::all();   
    $allLocations = [];
   
    foreach ($drivers as $driver) {
        
        $locations = $driver->locations;      
        $allLocations = array_merge($allLocations, $locations->toArray());
    }
    return response()->json(['locations' => $allLocations]);
}

}
