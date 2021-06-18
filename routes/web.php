<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}',function(){
    return view('home');
});
Route::get('/admin/{path?}',function(){
    return view('home');
});
Route::get('/product/{path?}',function(){
    return view('home');
});
Route::get('/transaction/{path?}',function(){
    return view('home');
});
