<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Roles/Index", [
            "roles" => Role::with("permissions")->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::pluck("name");
        return Inertia::render('Roles/Create', [
            "permissions" => $permissions
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
            "permissions" => "required",
        ]);

        $role = Role::create(["name" => $request->name]);
        $role->syncPermissions($request->permissions);

        return to_route("roles.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::find($id);
        return Inertia::render('Roles/Show', [
            "role" => $role,
            "permissions" => $role->permissions()->pluck("name"),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = Role::findOrFail($id);
        $permissions = Permission::pluck("name");
        $rolePermission = $role->permissions()->pluck("name");

        return Inertia::render('Roles/Edit', [
            "role" => $role,
            "permissions" => $permissions,
            "rolePermission" => $rolePermission,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required",
            "permissions" => "required",
        ]);

        $role = Role::findOrFail($id);
        $role->name = $request->name;
        $role->update();
        $role->syncPermissions($request->permissions);

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Role::destroy($id);
        return to_route('roles.index');
    }
}
