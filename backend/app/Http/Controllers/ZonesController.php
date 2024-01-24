<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;

class ZonesController extends Controller
{
public function all_zones(){
    $zones = Zone::withCount('bus')->get();
    return response()->json(['zones' => $zones]);
}


  public function add_zone(Request $request){
    $zone = Zone::create([ 
       'zone_name'=>$request->zone_name,
      
      ]);
     return response()->json(['status' => 'success'], 201);
  }

  public function buses_in_zone(Request $request){

  }
}
