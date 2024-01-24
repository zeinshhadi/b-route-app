<?php

namespace Database\Seeders;

use App\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */



    public function run()
    {
        $zoneNames = ['Saida', 'Tripoli', 'Beirut', 'Tyre', 'Nabatieh', 'Jezzine', 'Chouf'];

        foreach ($zoneNames as $zoneName) {
            Zone::create(['zone_name' => $zoneName]);
        }
    }

}
