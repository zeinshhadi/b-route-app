<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EndRideTest extends TestCase
{
    /**
     * A basic feature test example.
     */
public function test_end_ride_api(): void
{

    $driverResponse = $this->postJson('/api/login', [
        'email' => 'albert@gmail.com',
        'password' => '123123',
    ]);
    $driverResponse->assertStatus(200);


    $driverUserId = $driverResponse->json()['user']['id'];


    $passengerResponse = $this->postJson('/api/login', [
        'email' => 'john@gmail.com',
        'password' => '123123',
    ]);
    $passengerResponse->assertStatus(200);
    $passengerToken = $passengerResponse['authorization']['token'];


    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $passengerToken,
    ])->postJson('/api/add/ride', [
        'start_longitude' => 32.0,
        'start_latitude' => 30.0,
        'user_id' => $driverUserId,
    ]);

    $response->assertStatus(200)
        ->assertJson(['response from create ride ']);

    $endResponse = $this->withHeaders([
        'Authorization' => 'Bearer ' . $passengerToken,
    ])->postJson('/api/end/ride', [
        'end_longitude' => 32.1,
        'end_latitude' => 30.1,
        'user_id' => $driverUserId,
    ]);


    $endResponse->assertStatus(200)
        ->assertJson(['status' => 'success']);

}

}
