<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginUserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_login_user_api(): void
  {
        $user = User::where('email', 'emma@gmail.com')->first();
        $this->assertNotNull($user, 'User with email Hadi@gmail.com not found.');

        $hashedPassword = Hash::make('123123');

        $response = $this->postJson('/api/login', [
            'email' => 'emma@gmail.com',
            'password' => $hashedPassword,
        ]);

        // Debugging: Log response content
        // dump($response->content());

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'user' => [
                'id',
                'first_name',
                'last_name',
                'email',
                'phone',
                'user_type',
                'created_at',
                'updated_at',
                'deleted_at',
            ],
            'authorisation' => [
                'token',
                'type',
            ],
        ]);
    }
}