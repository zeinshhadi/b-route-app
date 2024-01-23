<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;

class SeatsController extends Controller
{
public function updateStatus(Request $request)
{
    
    $seatNumber = $request->input('seat_number');

    
    try {
        $seat = Seat::findOrFail($seatNumber); 
        $seat->status = true;
        $seat->save();

        return response()->json(['success' => true, 'message' => "Seat $seatNumber status updated successfully"]);
    } catch (\Exception $e) {
        
        return response()->json(['success' => false, 'message' => $e->getMessage()]);
    }
}
}
