<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BusesController extends Controller
{
    public function create_bus(Request $req){
        if(Auth::check()){
            $user = Auth::user();
            if($user&&$user->role_type=='admin'){
                $bus= Bus::create($req->all());
            }
        }
    }
        public function getAllBuses()
    {
        $buses = Bus::all();
        return response()->json(['buses' => $buses], 200);
    }
}
