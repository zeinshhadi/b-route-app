<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DriversController extends Controller
{

    public function create_driver(Request $request)
    {
   
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'phone_number' => 'required|string|max:15',
            'image' => 'required|string',
            'driver_license' => 'required|string|max:255',
            'bus_id' => 'required|exists:buses,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

    
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'phone_number' => $request->input('phone_number'),
            'role_type' => 'driver', 
        ]);

      
        $driver = Driver::create([
            'image' => $request->input('image'),
            'driver_license' => $request->input('driver_license'),
            'user_id' => $user->id,
            'bus_id' => $request->input('bus_id'),
        ]);

    
        return response()->json(['message' => 'Driver created successfully'], 201);
    }
     public function deleteDriverByUserId($userId)
    {    
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $driver = $user->driver;

        if ($driver) {
            $driver->delete();
            $user->delete();

            return response()->json(['message' => 'Driver deleted successfully']);
        }

        return response()->json(['error' => 'Driver not found'], 404);
    }

    public function getAllDrivers()
    {
        $drivers = Driver::with('user')->get();

        return response()->json(['drivers' => $drivers]);
    }

    public function getDriverByUserId($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $driver = $user->driver;

        if ($driver) {
            return response()->json(['driver' => $driver]);
        }

        return response()->json(['error' => 'Driver not found'], 404);
    }
}
