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
                'phone_number' => $request->phone_number,
                'resi' => '-',
                'status' => 0
            ]);

            //status 0 => pending | 1 => accepted | 2 =>  rejected
            
            $response = ['success' => true];
            return response($response, 200);
        }
         
    }

    public function show(Request $request)
    {
        $uid = $request->user()->id;
        $ts = Transaction::where('user_id',$uid)->get();
        return response($ts, 200);
    }

    public function detail(Request $request, $id)
    {
        $uid = $request->user()->id;   
        $ts = Transaction::findOrFail($id);
        // with user, fix ini
        
        if($ts->user_id == $uid){
            $res = [
                'req' => $ts,
                'item' => unserialize($ts->item),
                'found' => true
            ];
            return response($res, 200);
        }
        else{
            $res = [
                'found' => false,
                'message' => 'not found'
            ];
            return response($res, 200);
        }

    }

    public function allTrans()
    {
        $ts = Transaction::all();
        return response($ts, 200);
    }

    public function inputResi(Request $request, $id)
    {
        //tinggal tambahkan validasi
        return response($request->resi,200);
    }
}
