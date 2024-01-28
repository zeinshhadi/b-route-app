<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CreateUserTest extends TestCase
{
    // use RefreshDatabase;

    /**
     * Test user registration.
     *
     * @return void
     */
    public function test_successful_create_user_api()
    {
    

        $userData = [
            'first_name' => 'messi',
            'last_name' => 'lionel',
            'email' => 'messi@gmail.com',
            'password' => '123123',
            'phone_number' => '123456789',
        ];

        $response = $this->post('/api/register', $userData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'User created successfully',
            ])
            ->assertJsonMissing([
                'errors' => [
                    'email' => ['The email has already been taken.']
                ]
            ]);
    }
}
