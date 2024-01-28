<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteDriverTest extends TestCase
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
        ])->deleteJson('/api/delete/driver/17');

        $response->assertStatus(200)
                ->assertExactJson([
                     'message' => 'Driver deleted successfully',
                 ]);
    }
}
