<?php

namespace Tests\Feature;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class GetAllDriversTest extends TestCase
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
        ])->getJson('/api/all/drivers');

        $response->assertStatus(200)
                 ->assertJsonStructure(['drivers']);
    }
}
