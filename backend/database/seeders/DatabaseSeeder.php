<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
            $this->call([
            SeatsSeader::class,
            ZoneSeeder::class,
            UserSeeder::class,
            BusSeeder::class,
            DriverSeeder::class,
            RideSeeder::class,
        ]);
    }
}
