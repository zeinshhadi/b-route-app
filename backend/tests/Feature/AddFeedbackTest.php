<?php

namespace Tests\Feature;

use App\Models\Driver;
use App\Models\Ride;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddFeedbackTest extends TestCase
{
    /**
     * A basic feature test example.
     */
  public function test_add_feedback_api(): void

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
    $response->assertStatus(200);

$ride = Ride::where('user_id', 4)->latest()->first();

    if ($ride) {
        $feedbackResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $passengerToken,
        ])->postJson('/api/feedback/ride', [
            'rate' => 5,
            'review' => 'helo there',
        ]);

        $feedbackResponse->assertStatus(200)
            ->assertJson([
                'ride' => [
                    'id' => $ride->id,
                    'start_longitude' => $ride->start_longitude,
                    'start_latitude' => $ride->start_latitude,
                    'end_longitude' => $ride->end_longitude,
                    'end_latitude' => $ride->end_latitude,
                    'rate' => $ride->rate,
                    'price' => $ride->price,
                    'review' => 'helo there', 
                    'user_id' => $ride->user_id,
                    'driver_id' => $ride->driver_id,

                ],
            ]);
    } else {
        $this->fail("No ride found for user ID: $driverUserId");
    }
}
}