<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;
  protected  $fillable =['start_location','end_location','rate','price','user_id','driver_id'];
}
