<?php

namespace Database\Seeders;

use App\Models\Seat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          for ($i = 1; $i <= 9; $i++) {
            Seat::create([
                'id' => $i,
                'status' => false,
            ]);
        }
    }
}
