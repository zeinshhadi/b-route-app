<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetFreeBusesTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
{
        
           $response = $this->postJson('/api/login', [
            'email' => 'admin@gmail.com',
            'password' => '123123',
        ]);

        $response->assertStatus(200);

        $token = $response['authorization']['token'];


        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/free/buses');

        $response->assertStatus(200)
                 ->assertJsonStructure(['buses']);
    }
}
