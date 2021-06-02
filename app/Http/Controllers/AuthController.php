<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $rules = [
            'email' => 'required',
            'password' => 'required',
        ];
        
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response($validator->errors(), 200);
        }

        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            $response = [
                'success' => false,
                'message' => 'These credentials do not match our records.'
            ];
            return response($response);
        }
    
        $token = $user->createToken('ApiToken')->plainTextToken;
    
        $response = [
            'success'   => true,
            'user'      => $user,
            'token'     => $token
        ];
        
        return response($response, 201);
    }

    public function register(Request $request)
    {

        $rules = [
            'name' => 'required|unique:users',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
        ];
        
        $validator = Validator::make($request->all(), $rules);
    
        if($validator->fails()){
            return response($validator->errors(), 200);
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 0,
        ]);

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('ApiToken')->plainTextToken;

        $response = [
            'success'   => true,
            'user'      => $user,
            'token'     => $token
        ];


        return response($response, 201);
        
    }

    public function logout(Request $request)
    {
        
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json([
            'success' => true
        ], 200);
    }
}
