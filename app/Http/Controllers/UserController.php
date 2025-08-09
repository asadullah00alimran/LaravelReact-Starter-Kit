<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller implements HasMiddleware
{
        public static function middleware(): array
    {
        return [
            // Role View permission
            new Middleware('permission:users.view', only: ['index', 'show']),

            // Role Create permission
            new Middleware('permission:users.create', only: ['create', 'store']),

            // Role Edit permission
            new Middleware('permission:users.edit', only: ['edit', 'update']),

            // Role Delete permission
            new Middleware('permission:users.delete', only: ['destroy']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->get();
        return Inertia::render('Users/Index', [
            "users" => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::pluck('name');
        return Inertia::render('Users/Create', [
            "roles" => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            "name" => "required",
            "email" => "required|unique:users,email",
            "password" => "required",
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        $user->syncRoles($request->roles);

        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        return Inertia::render('Users/Show', [
            "user" => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::find($id);
        $userRoles = $user->roles()->pluck("name");
        // dd($userRole);
        $roles = Role::pluck("name");
        return Inertia::render('Users/Edit', [
            "user" => $user,
            "roles" => $roles,
            "userRoles" => $userRoles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required",
            "email" => "required",
            "password" => "nullable",
        ]);

        $user = User::findOrFail($id);

        $user->name = $request->name;
        $user->email = $request->email;

        if($request->password){
            $user->password = Hash::make($request->password);
        }        
        $user->save();
        $user->syncRoles($request->roles);
        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
        return to_route('users.index');
    }
}
