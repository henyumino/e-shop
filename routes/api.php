<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReviewController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// route grup setelah auth

Route::get('/item', [ItemController::class, 'show']);
Route::get('/item/{slug}', [ItemController::class, 'showSingle']);

Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/item', [ItemController::class, 'store']);
    Route::delete('/item/{id}', [ItemController::class, 'delete']);
    Route::get('/item/{id}', [ItemController::class, 'single']);
    Route::post('/item/{id}', [ItemController::class, 'update']);
    // coba hilangkan middleware didalam route group
    Route::post('/review',[ReviewController::class, 'store']);
});



