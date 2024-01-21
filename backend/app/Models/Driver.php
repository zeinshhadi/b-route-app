<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;
    protected $fillable=[
        'first_name',
        'last_name',
        'email',
        'password',
        'mobile_number',
        'image',
        'id_card_number',
        'driver_license',
        'driver_status',
        'bus_id',
        'user_id',
    'role_type'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }
    public function locations()
    {
        return $this->hasMany(Location::class);
    }
    public function zone(){
        return $this->belongsTo(Zone::class);
    }
}
