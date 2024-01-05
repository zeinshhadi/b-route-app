<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RidesController extends Controller
{
public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function create_ride(Request $request){
      $user = Auth::user();
            $ride = Ride::create([
            'start_location' => $request->start_location,
            'end_location'=>0,
            'rate'=>0,
            'price'=>0,
            'user_id'=>$user->id,
            'driver_id'=>$request->driver_id,
            ]);
    }

    public function end_ride(Request $request){
         $user = Auth::user();
        $ride= Ride::where('user_id',$user->user_id)->latest()->first();
          $ride = Ride::where('ride_id',$ride->ride_id)->update(["end_location"=>$request->end_location]);
    }
}
