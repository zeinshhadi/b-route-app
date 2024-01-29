<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StartRideTest extends TestCase
{
 
    public function test_example(): void
  {
        $driverResponse = $this->postJson('/api/login',[
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
}
}