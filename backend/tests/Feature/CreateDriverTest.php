<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateDriverTest extends TestCase
{
    /**
     * Test create driver API.
     *
     * @return void
     */
    // ...

public function test_successful_create_driver_api(): void
{
    // Dummy data for creating a driver
    $userData = [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'johndoe@example.com',
        'password' => 'password123',
        'phone_number' => '123456789',
        'driver_license' => 'ABC123456',
        'bus_id' => 1,
         'image' => realpath(__DIR__.'../../public/storage/28_1706448972_image_1706448926498.jpg.jpg')
    ];

    $loginResponse = $this->postJson('/api/login', [
        'email' => 'admin@gmail.com',
        'password' => '123123',
    ]);
    $loginResponse->assertStatus(200);

    $token = $loginResponse['authorization']['token'];

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->postJson('/api/register/driver', $userData);

    $response->assertStatus(200)
             ->assertJson([
                 'status' => 'success',
             ]);


}

}
