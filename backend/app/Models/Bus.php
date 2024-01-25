<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes;
class Bus extends Model
{
    use HasFactory;
    use softDeletes;
    protected $fillable = ['vin','color','plate_number','model','number_of_seats','zone_id'];
public function driver()
{
    return $this->hasOne(Driver::class);
}
public function zone()
{
    return $this->hasOne(Zone::class);
}
}
