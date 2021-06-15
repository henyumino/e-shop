<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
            'item' => 'required',
            'total' => 'required',
            'name' => 'required',
            'address' => 'required',
            'country' => 'required',
            'province' => 'required',
            'city' => 'required',
            'phone_number' => 'required|numeric',
        ];
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            $response = [
                'success' => false,
                'errors' => $validator->errors()
            ];
            return response($response, 200);
        }
        else{
            Transaction::create([
                'user_id'   => $request->user()->id,
                'name'      => $request->name,
                'item'      => serialize($request->item),
                'total'     => $request->total,
                'address'   => $request->address,
                'country'   => $request->country,
                'province'  => $request->province,
                'city'      => $request->city,
                'phone_number' => $request->phone_number
            ]);
            
            
            $response = ['success' => true];
            return response($response, 200);
        }
         
    }
}
