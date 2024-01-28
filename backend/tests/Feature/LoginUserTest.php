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
   

 
        $response = $this->postJson('/api/login', [
            'email' => 'admin@gmail.com',
            'password' => '123123', 
        ]);


        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'user' => [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone_number',
                    'role_type',
                    'created_at',
                    'updated_at',
                    'deleted_at',
                ],
                'authorization' => [
                    'token',
                    'type',
                ],
            ]);
    }
}
