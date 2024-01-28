<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */

class DriverFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Driver::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = \Faker\Factory::create();

     
        $user = User::create([
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'),
            'phone_number' => $this->faker->phoneNumber,
            'role_type' => 'driver', 
        ]);

        return [
            'image_filename' => $faker->numberBetween(100000, 999999) . '.' . $faker->randomElement(['png', 'jpg', 'jpeg']),
            'driver_license' => $faker->numberBetween(100000, 999999),
            'user_id' => $user->id,
            'bus_id' => $faker->numberBetween(1, 10),
        ];
    }
}