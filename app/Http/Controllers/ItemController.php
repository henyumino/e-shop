<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'price' => 'required|numeric',
            'desc' => 'required',
            'image' => 'required|mimes:jpeg,jpg,png|max:1024'
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
            // buat uniq name untuk image$random_num = Str::random(10);
            $random_num = Str::random(10);
            $request->image->storeAs('public/item_image', time().'_'.$random_num.'.jpg');
            $image = time().'_'.$random_num.'.jpg';

            $slug = Str::slug($request->name, '-');
        
            Item::create([
                'name' => $request->name,
                'slug' => $slug,
                'price' => $request->price,
                'description' => $request->desc,
                'item_image' => $image,
                'rating' => 0
            ]);
            $response = [
                'success' => true,
            ];
            return response($response, 200);
        }
        
    }

    public function show()
    {
        return Item::all();
    }
    
    public function delete(Request $request)
    {
        Item::destroy($request->id);
        return response("sukses ", 200);
    }

    public function single(Request $request)
    {
        $item = Item::findOrFail($request->id);

        return response($item, 200);
    }

    public function update(Request $request,$id)
    {
        $rules = [
            'name' => 'required',
            'price' => 'required|numeric',
            'desc' => 'required',
            'image' => 'nullable|mimes:jpeg,jpg|max:1024'
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
            $item = Item::find($id);
            $random_num = Str::random(10);
            $request->image->storeAs('public/item_image', time().'_'.$random_num.'.jpg');
            $image = time().'_'.$random_num.'.jpg';
            $slug = Str::slug($request->name, $separator);
            if($request->image){

                $item->name = $request->name;
                $item->slug = $slug;
                $item->price = $request->price;
                $item->description = $request->desc;
                $item->item_image = $image;
                $item->save();
               
                $response = [
                    'success' => true,
                ];
                return response($response, 200);
            }
            else{
                $item->name = $request->name;
                $item->slug = $slug;
                $item->price = $request->price;
                $item->description = $request->desc;
                $item->save();
                $response = [
                    'success' => true,
                ];
                return response($response, 200);
            }
        }

        
    }

    public function showSingle(Request $request, $slug)
    {
        // $item = Item::where('slug', $slug)->first();
        // if(!$item){
        //     $item = null;
        // }
        $item = Item::with('reviews.user','user')->where('slug', $slug)->first();
        return response($item, 200);
    }
}
