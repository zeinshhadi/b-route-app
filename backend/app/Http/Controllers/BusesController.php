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
        $buses = Bus::has('driver')->with('driver')->get();
        return response()->json(['buses' => $buses], 200);
    }
    public function getBusesByZone($zone_id){
        $bus = Bus::where('zone_id',$zone_id)->get();
         return response()->json(['bus' => $bus], 200);
    }
public function getFreeBuses(){
    $buses = Bus::doesntHave('driver')->get();
    return response()->json(['buses'=>$buses]);
}
}
