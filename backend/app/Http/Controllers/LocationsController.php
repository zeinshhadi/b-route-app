<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationsController extends Controller
{
public function createDriverLocation(Request $request)
{
    try {
        $user = Auth::user();
        $driver = Driver::findOrFail($user->id);

        $request->validate([
            'lon' => 'required',
            'lat' => 'required',
        ]);

        $location = Location::create([
            'driver_id' => $driver->id,
            'longitude' => $request->lon,
            'latitude' => $request->lat,
        ]);

        return response()->json(['location' => $location, 'message' => 'Location created successfully'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to create location', 'message' => $e->getMessage()], 500);
    }
}

public function updateDriverLocation(Request $request)
{
    try {
        $user = Auth::user();
        $driver = Driver::findOrFail($user->id);

        $request->validate([
            'lon' => 'required',
            'lat' => 'required',
        ]);

        $location = Location::where('driver_id', $driver->id)->first();

        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }

        $location->update([
            'longitude' => $request->lon,
            'latitude' => $request->lat,
        ]);

        return response()->json(['location' => $location, 'message' => 'Location updated successfully']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to update location', 'message' => $e->getMessage()], 500);
    }
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
