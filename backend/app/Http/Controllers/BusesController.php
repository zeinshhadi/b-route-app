<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BusesController extends Controller
{

public function create_bus(Request $request){
             $bus= Bus::create($request->all());
             return response()->json(['status'=>'success'],200);

    }
public function getAllBuses()
    {
        $buses = Bus::all();
        return response()->json(['buses' => $buses], 200);
    }


        public function getAllBusesAndDriver()
    {
        $buses = Bus::has('driver')->with(['driver.user'])->get();
        return response()->json(['buses' => $buses], 200);
    }

public function getBusAndDriver($driver_id)
{
    $driver = Driver::find($driver_id);

    
    if (!$driver) {
        return response()->json(['message' => 'Driver not found for the provided driver_id'], 404);
    }
    
    $bus = Bus::where('id', $driver->bus_id)
        ->with(['driver.user'])
        ->first();

    
    if ($bus) {
        return response()->json(['bus' => $bus], 200);
    } else {
        return response()->json(['message' => 'Bus not found for the provided driver_id'], 404);
    }
}



public function getBusesByZone($zone_id){


            $bus = Bus::where('zone_id',$zone_id)->has('driver')->with(['driver.user'])->get();


             return response()->json(['bus' => $bus], 200);
        }


public function getFreeBuses(){


        $buses = Bus::doesntHave('driver')->get();


        return response()->json(['buses'=>$buses]);


    }

    }
