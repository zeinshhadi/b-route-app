<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class SeatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 9; $i++) {
            DB::table('seats')->insert([
                'status' => false, // Set the initial status as needed
                // Add other columns if needed
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
