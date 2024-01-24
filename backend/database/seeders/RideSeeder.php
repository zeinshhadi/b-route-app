<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\Ride;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run()
    {

    $passengerUsers = User::where('role_type', 'passenger')->pluck('id')->toArray();
    $driverIds = Driver::pluck('id')->toArray(); 

    
    for ($i = 0; $i < 10; $i++) {
        $passengerId = $this->getRandomElement($passengerUsers);
        $driverId = $this->getRandomElement($driverIds);


            $ride = Ride::create([
                'start_longitude' => $this->getRandomLongitude(),
                'start_latitude' => $this->getRandomLatitude(),
                'end_longitude' => $this->getRandomLongitude(),
                'end_latitude' => $this->getRandomLatitude(),
                'rate' => $this->getRandomFloat(4, 5, 1),
                'price' => 20, 
                'review' => $this->getRealisticReview(),
                'user_id' => $passengerId,
                'driver_id' => $driverId,
            ]);

            
        }
    }

    
    private function getRandomElement($array)
    {
        return $array[array_rand($array)];
    }

    
    private function getRandomLongitude()
    {
        return mt_rand(-180000000, 180000000) / 1000000.0;
    }

    
    private function getRandomLatitude()
    {
        return mt_rand(-90000000, 90000000) / 1000000.0;
    }

    
    private function getRandomFloat($min, $max, $precision = 2)
    {
        return round($min + mt_rand() / mt_getrandmax() * ($max - $min), $precision);
    }

    
    private function getRealisticReview()
    {
        $reviews = [
            "Great experience, the driver was friendly and punctual.",
            "The bus was clean and comfortable. Would ride again!",
            "Smooth ride and excellent service. Highly recommended.",
            "Driver was professional and knew the route well.",
            "The app made booking and tracking the ride so easy.",
            "Comfortable seats and a hassle-free journey.",
            "Driver was helpful and assisted with luggage.",
            "Overall, a positive experience. Will use the service again.",
            "On-time arrival and departure. Good value for money.",
            "Clean and well-maintained bus. No complaints.",
        ];

        return $this->getRandomElement($reviews);
    }
}
