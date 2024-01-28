<?php

namespace Tests\Feature;

use App\Models\Driver;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateDriverTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_successful_create_driver_api(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'admin@gmail.com',
            'password' => '123123',
        ]);

        $response->assertStatus(200);

        $token = $response['authorisation']['token'];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/register/driver', [
            'first_name' => 'bernadette',
            'last_name' => 'atieh',
            'email' => 'atieh@gmail.com',
            'password' => '123123',
            'phone_number' => '654485',
            'role_type' => 'driver', 
        'image' => '123123.jpg',
        'driver_license' => '3521545',

        ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Donation added successfully',
            ]);

        $this->assertDatabaseHas('orders', [
            'description' => 'Fifth Donation',
            'total_weight' => '20',
            'pickup_within' => '24',
            'phone_number' => '+96103899901',
            'date' => '2024-01-28',
            'location_pickup' => '123 Street',
        ]);
        $this->assertDatabaseHas('locations', [
            'latitude' => '40.7128',
            'longitude' => '-4.73',
            'description' => 'Al-Hamra',
        ]);
    }
}

