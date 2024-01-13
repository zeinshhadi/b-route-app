<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;

class ZonesController extends Controller
{
  public function all_zones(){
    $zone=Zone::all();
    return response()->json(['zones'=>$zone]);
  }

  public function add_zone(Request $request){
    $zone = Zone::create([ 
       'zone_name'=>$request->zone_name,
      
      ]);
     return response()->json(['status' => 'success'], 201);
  }
}
