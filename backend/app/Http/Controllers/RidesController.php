<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Ride;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RidesController extends Controller
{

public function create_ride(Request $request){
    $user = Auth::user();

    $request->validate([
        'start_longitude' => 'required',
        'start_latitude' => 'required',
        'user_id' => 'required',
    ]);
    $driver = Driver::where('user_id', $request->user_id)->first();

  
    $ride = Ride::create([
        'start_longitude' => $request->start_longitude,
        'start_latitude' => $request->start_latitude,
        'end_longitude' => 0,
        'end_latitude' => 0,
        'rate' => 0,
        'price' => 20,
        'review' => 'NoReview',
        'user_id' => $user->id,
        'driver_id' => $driver->id,
    ]);
    return response()->json(["response from create ride ",$driver]);
}

    public function end_ride(Request $request){
        $user = Auth::user();
        $ride= Ride::where('user_id',$user->id)->latest()->first();
        $ride->update(['end_latitude' => $request->end_latitude,'end_longitude'=>$request-> end_longitude]);
    }

    
    public function add_feedback(Request $request){
        $user = Auth::user();
        $ride= Ride::where('user_id',$user->id)->latest()->first();
        if($ride){
        $ride->update(["rate"=>$request->input('rate'),"review"=>$request->input('review')]);
        return response()->json(['ride ',$ride]);
        }else{
            return response()->json(['ride not found']);
        }
        
    }
    public function get_feedback(){
        
        $reviews = Ride::where(function ($query) {
        $query->whereNotNull('rate')->orWhereNotNull('review');
                          
        })->get();
    
        return response()->json(['reviews' => $reviews]);
    }


}
