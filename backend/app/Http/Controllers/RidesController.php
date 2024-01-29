<?php

namespace App\Http\Controllers;

use App\Models\Bus;
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

    $bus_id=$driver->bus_id;
     $bus = Bus::find($bus_id);
     $num_of_seats = $bus->number_of_seats;
    if($num_of_seats>=1){
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
    $bus = Bus::find($bus_id);
    $bus->decrement('number_of_seats');

    return response()->json(["response from create ride ",$driver]);
    }else{
        return response()->json(["Bus is in full capacity"]);
    }

}

public function end_ride(Request $request){
    
    $rules = [
        'end_latitude' => 'required|numeric',
        'end_longitude' => 'required|numeric',
        'user_id' => 'required|exists:users,id',
        
    ];

    
    $validatedData = $request->validate($rules);

    
    $user = Auth::user();

    $ride = Ride::where('user_id', $user->id)->latest()->first(); 
    $ride->update([
        'end_latitude' => $validatedData['end_latitude'],
        'end_longitude' => $validatedData['end_longitude']
    ]);

    $driver = Driver::where('user_id', $validatedData['user_id'])->first();
    if ($driver) {
        $bus = Bus::find($driver->bus_id);
        if ($bus) {
            $bus->increment('number_of_seats');
        } else {
            
            return response()->json(['error' => 'Bus not found'], 404);
        }
    } else {
        
        return response()->json(['error' => 'Driver not found'], 404);
    }

    return response()->json(['status' => 'success'], 200);
}

    
public function add_feedback(Request $request){
    
    $rules = [
        'rate' => 'required|numeric|min:1|max:5',
        'review' => 'nullable|string|max:255',
        
    ];
 
    $validatedData = $request->validate($rules);
    $user = Auth::user();
    $ride = Ride::where('user_id', $user->id)->latest()->first();
    if($ride){
        $ride->update([
            'rate' => $validatedData['rate'],
            'review' => $validatedData['review'],
        ]);

        return response()->json(['ride' => $ride]);
    } else {
        return response()->json(['error' => 'Ride not found'], 404);
    }
}

public function get_feedback() {
    $reviews = Ride::whereHas('user', function ($query) {
            $query->where('first_name', '!=', '')
                  ->where('last_name', '!=', '');
        })
        ->where('rate', '!=', 0)
        ->where('review', '!=', 'NoReview')
        ->with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name');
        }])
        ->select('user_id', 'rate', 'review')
        ->get();

    return response()->json(['reviews' => $reviews]);
}
public function get_driver_feedback($driverId) {
    $reviews = Ride::where('driver_id', $driverId)
        ->where('rate', '!=', 0)
        ->where('review', '!=', 'NoReview')
        ->with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name');
        }])
        ->select('user_id', 'rate', 'review')
        ->get();

    return response()->json(['reviews' => $reviews]);
}



}
