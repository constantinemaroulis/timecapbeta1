<?php

// database/seeders/RolePermissionSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Create Permissions
        $permissions = [
            'view dashboard',
            'create job',
            'edit job',
            'delete job',
            'start day',
            'allocate cost codes',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles and Assign Permissions
        $roles = [
            'superadmin' => ['view dashboard', 'create job', 'edit job', 'delete job', 'start day', 'allocate cost codes'],
            'site super' => ['view dashboard', 'start day', 'allocate cost codes'],
            'worker' => ['allocate cost codes'],
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($rolePermissions);
        }
    }
}
