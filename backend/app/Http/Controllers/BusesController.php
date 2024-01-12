<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BusesController extends Controller
{

    public function create_bus(Request $req){
             $bus= Bus::create($req->all());
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
}
