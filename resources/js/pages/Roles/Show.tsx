
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show Role',
        href: '/roles'
    },
];

export default function Show({role}) {

    // const {data, setData, errors, post} = useForm({
    //     name : "",
    //     email : "",
    //     password : "",
    //     password_confirmation : "",
    // });

    // function submit(e){
    //     e.preventDefault();
    //     post(route('roles.store'));
    // }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="roles" />
            <div className='px-20 mt-10 sm:px-5'>

                <Link
                    href={route('roles.index')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Roles List
                </Link>

                <div className='mt-10'>

                    <p>{role.name}</p>
                    <p>{role.email}</p>

                </div>

            </div>
        </AppLayout>
    );
}
