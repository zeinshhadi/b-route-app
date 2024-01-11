<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;

class ZonesController extends Controller
{
  public function all_zones(){
    $zone=Zone::all();
    return response()->json(['Zones are as follows : '=>$zone]);
  }
}
