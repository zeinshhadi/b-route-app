<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{   public function run()
    {
        // Admin user with id 3
        DB::table('users')->insert([
            'id' => 3,
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123123'),
            'phone_number' => '123456789',
            'role_type' => 'admin',
        ]);

        $passengerNames = ['John', 'Jane', 'David', 'Emma', 'Michael', 'Olivia', 'Carla', 'Daniel', 'Zein', 'Nour', 'Chris', 'Taha'];
        $passengerLastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Harris'];
        foreach ($passengerNames as $key => $name) {
            User::create([
                'first_name' => $name,
                'last_name' => $passengerLastNames[$key],
                'email' => strtolower($name) . '@gmail.com',
                'password' => Hash::make('123123'),
                'phone_number' => '123456789',
                'role_type' => 'passenger',
            ]);
        }

        $driverNames = ['Christelle', 'Tom', 'Jennifer', 'Robert', 'Scarlett', 'Leonardo', 'Sandra', 'Maria', 'Angela', 'Nada', 'Georgette'];
        $driverLastNames = ['Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Harris'];
        foreach ($driverNames as $key => $name) {
            User::create([
                'first_name' => $name,
                'last_name' => $driverLastNames[$key],
                'email' => strtolower($name) . '@gmail.com',
                'password' => Hash::make('123123'),
                'phone_number' => '987654321',
                'role_type' => 'driver',
            ]);
        }
    }
}