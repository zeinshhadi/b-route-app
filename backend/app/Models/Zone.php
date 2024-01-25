<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes;
class Zone extends Model
{
    use HasFactory,softDeletes;
   protected $fillable = ['zone_name'];

   public function driver(){
   return $this->hasMany(Driver::class);
   }
   public function bus(){
   return $this->hasMany(Bus::class);
   }
}
