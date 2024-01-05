<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;
  protected  $fillable =['start_location','end_location','rate','price','user_id','driver_id'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }
}
