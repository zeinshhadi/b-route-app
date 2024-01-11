<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;
    protected $fillable = ['vin','color','plate_number','model','number_of_seats','zone_id'];
public function driver()
{
    return $this->hasOne(Driver::class);
}
}
