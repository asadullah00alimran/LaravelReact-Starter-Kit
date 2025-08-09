<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            // Role View permission
            new Middleware('permission:roles.view', only: ['index', 'show']),

            // Role Create permission
            new Middleware('permission:roles.create', only: ['create', 'store']),

            // Role Edit permission
            new Middleware('permission:roles.edit', only: ['edit', 'update']),

            // Role Delete permission
            new Middleware('permission:roles.delete', only: ['destroy']),
        ];
    }

    public function index()
    {
        return Inertia::render("Roles/Index", [
            "roles" => Role::with("permissions")->get(),
        ]);
    }

    public function create()
    {
        $permissions = Permission::pluck("name");
        return Inertia::render('Roles/Create', [
            "permissions" => $permissions
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => "required",
            "permissions" => "required",
        ]);

        $role = Role::create(["name" => $request->name]);
        $role->syncPermissions($request->permissions);

        return to_route("roles.index");
    }

    public function show(string $id)
    {
        $role = Role::find($id);
        return Inertia::render('Roles/Show', [
            "role" => $role,
            "permissions" => $role->permissions()->pluck("name"),
        ]);
    }

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

    public function destroy(string $id)
    {
        Role::destroy($id);
        return to_route('roles.index');
    }
}
