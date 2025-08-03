
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show Role',
        href: '/roles'
    },
];

export default function Show({ role, permissions }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className='px-20 mt-10 sm:px-5'>

                <Link
                    href={route('roles.index')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Role List
                </Link>

                <div className='mt-10'>
                    <p><strong>Role: </strong>{role.name}</p>
                    <p><strong>Permissions: </strong></p>
                    <div className='flex space-x-2'>
                        {
                        permissions.map(
                            (permission) => <span className='bg-green-200 text-black rounded-4xl px-2 '>{permission}</span>
                        )
                    }
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
