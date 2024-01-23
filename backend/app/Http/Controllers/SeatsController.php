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
        $seat->status = !$seat->status; // Toggle the status
        $seat->save();

        return response()->json([
            'success' => true,
            'message' => "Seat $seatNumber status updated successfully",
            'new_status' => $seat->status
        ]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => $e->getMessage()]);
    }
}

public function get_seats(){
                $seats = Seat::all();

            return response()->json([
                'success' => true,
                'message' => 'Seats retrieved successfully',
                'seats' => $seats,
            ]);
}

}
