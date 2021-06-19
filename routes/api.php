<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TransactionController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// route grup setelah auth

Route::get('/item', [ItemController::class, 'show']);
Route::get('/item/{slug}', [ItemController::class, 'showSingle']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/item', [ItemController::class, 'store']);
    Route::delete('/item/{id}', [ItemController::class, 'delete']);
    Route::get('/item/{id}', [ItemController::class, 'single']);
    Route::post('/item/{id}', [ItemController::class, 'update']);
    // coba hilangkan middleware didalam route group
    Route::post('/review',[ReviewController::class, 'store']);
    //transaction
    Route::post('/checkout',[TransactionController::class, 'store']);
    Route::get('/transaction',[TransactionController::class, 'show']);
    Route::get('/detail/{id}',[TransactionController::class, 'detail']); 
    Route::get('/transaction/all',[TransactionController::class, 'allTrans']); 
    Route::post('/resi/{id}',[TransactionController::class, 'inputResi']); 
    Route::post('/status/{id}',[TransactionController::class, 'inputStatus']); 
    
});



