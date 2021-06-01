<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
            'body' => 'required',
            'user_id' => 'required',
            'item_id' => 'required'
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
            //fungsi untuk menyimpan ke database
            Review::create([
                'user_id'   => $request->user_id,
                'item_id'   => $request->item_id,
                'body'      => $request->body
            ]);

            $response = [
                'success' => true,
            ];
            return response($response, 200);
        }

    }
}
