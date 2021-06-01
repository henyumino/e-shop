<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $table = 'item';
    // saat migration ganti nama table menjadi items

    protected $fillable = [
        'name',
        'slug',
        'price',
        'item_image',
        'description',
        'rating'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function reviews()
    {
        return $this->hasMany(Review::class)->latest();
    }

}
