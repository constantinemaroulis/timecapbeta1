<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            'view dashboard',
            'manage settings',
            'start day',
            'view cost coding',
            'manage cost coding',
            'view expenses',
            'manage expenses',
            'add worker',
            'view job information',
            'assign jobs',
            'manage users',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $roles = [
            'Site Super' => [
                'view dashboard',
                'start day',
                'view cost coding',
                'view expenses',
                'add worker',
                'view job information',
            ],
            'Project Manager' => [
                'view dashboard',
                'manage settings',
                'assign jobs',
                'manage cost coding',
                'manage expenses',
                'view job information',
            ],
            'Accounting' => [
                'view dashboard',
                'view expenses',
                'manage expenses',
            ],
            'Super Admin' => Permission::all(),
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::create(['name' => $roleName]);
            $role->givePermissionTo($rolePermissions);
        }
    }
}

