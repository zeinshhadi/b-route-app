<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;
   protected $fillable = ['zone_name'];

   public function driver(){
   return $this->hasMany(Driver::class);
   }
   public function bus(){
   return $this->hasMany(Bus::class);
   }
}
