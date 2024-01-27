<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Bus;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $drivers = User::where('role_type', 'driver')->get();

        $assignedBusIds = [];

        foreach ($drivers as $driver) {

            $bus = Bus::whereNotIn('id', $assignedBusIds)->inRandomOrder()->first();


            if (!$bus) {
                break;
            }


            $assignedBusIds[] = $bus->id;

     
            $driverLicense = mt_rand(10000000, 99999999);
            $driverLicenseTruncated = substr((string) $driverLicense, 0, 255);

  
            $driver->driver()->create([
                'bus_id' => $bus->id,
                'driver_license' => $driverLicenseTruncated,
            ]);
        }
    }
}

