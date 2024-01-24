<?php

namespace Database\Seeders;

use App\Models\Bus;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        
        $drivers = User::where('role_type', 'driver')->get();

        
        foreach ($drivers as $driver) {
            
            $bus = Bus::inRandomOrder()->first();

            
            $driverLicense = mt_rand(10000000, 99999999);

            
            $driverLicenseString = (string) $driverLicense;

            
            $driverLicenseTruncated = substr($driverLicenseString, 0, 255);

            
            $driver->driver()->create([
                'bus_id' => $bus->id,
                'driver_license' => $driverLicenseTruncated,
            ]);
        }
    }
}
