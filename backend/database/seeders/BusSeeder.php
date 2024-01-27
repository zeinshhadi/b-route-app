<?php

namespace Database\Seeders;

use App\Models\Bus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 public function run()
    {
        $zones = [1, 2, 3, 4, 5];
        $models = ['Mazda', 'Toyota', 'Mercedes', 'Ford', 'Chevrolet', 'Honda'];

        for ($i = 1; $i <= 6; $i++) {
            Bus::create([
                'vin' => rand(1000000000000000, 9999999999999999),
                'color' => $this->getRandomColor(),
                'plate_number' => rand(100000, 999999),
                'model' => $models[array_rand($models)],
                'number_of_seats' => 9,
                'zone_id' => $zones[array_rand($zones)],
            ]);
        }
    }

    private function getRandomColor()
    {
        $colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Silver', 'Gray'];
        return $colors[array_rand($colors)];
    }
}
