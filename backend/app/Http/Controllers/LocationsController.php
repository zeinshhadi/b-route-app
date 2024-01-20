<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    public function get_driver_location(Request $request){
        $driver_id = Driver::find(1);
        return response()->json(['driver id ',$driver_id]);
     
    }
}
