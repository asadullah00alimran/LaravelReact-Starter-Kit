<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'users.view',
            'users.edit',
            'users.delete',
            'users.create',
            'roles.view',
            'roles.edit',
            'roles.delete',
            'roles.create',
        ];

        foreach ($permissions as $key => $value){
            $permission = Permission::create(['name' => $value]);
        }
    }
}
