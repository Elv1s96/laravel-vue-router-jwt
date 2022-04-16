<?php

namespace App\Http\Controllers;

use App\Http\Resources\Fruit\FruitsResource;
use App\Models\Fruit;
use Illuminate\Http\Request;

class FruitController extends Controller
{
    public function getFruits()
    {
        $fruits =  Fruit::all();
        return $fruits;
        return FruitsResource::collection($fruits);
    }
}
