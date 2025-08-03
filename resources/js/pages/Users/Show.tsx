
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show User',
        href: '/users'
    },
];

export default function Show({user}) {

    // const {data, setData, errors, post} = useForm({
    //     name : "",
    //     email : "",
    //     password : "",
    //     password_confirmation : "",
    // });

    // function submit(e){
    //     e.preventDefault();
    //     post(route('users.store'));
    // }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className='px-20 mt-10 sm:px-5'>

                <Link
                    href={route('users.index')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    User List
                </Link>

                <div className='mt-10'>

                    <p>{user.name}</p>
                    <p>{user.email}</p>

                </div>

            </div>
        </AppLayout>
    );
}
