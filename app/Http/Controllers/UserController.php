<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserRegistrationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function registration(UserRegistrationRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::where('email',$data['email'])->first();
        if($user) return response(['error' => 'User with this email already exists'],403);
        $user = User::create($data);
        /*$user = User::firstOrCreate([
            'email' => $data['email']
        ],$data);*/
        $token = auth()->tokenById($user->id);
        return response(['access_token' => $token]);
    }
}
