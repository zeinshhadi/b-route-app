<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Faker\Factory as Faker;

class CreateUserTest extends TestCase
{
    use WithFaker;

    /**
     * Test user registration.
     *
     * @return void
     */
    public function test_successful_create_user_api()
    {
        $faker = Faker::create();

        $user = [
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'email' => $faker->unique()->safeEmail,
            'password' => '123123', // You can also use $faker->password to generate a random password
            'phone_number' => $faker->phoneNumber,
        ];

        $response = $this->post('/api/register', $user);

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
