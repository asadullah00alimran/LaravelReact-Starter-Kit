
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Role',
        href: '/roles'
    },
];

export default function Edit({role}) {

    const { data, setData, errors, put} = useForm({
        name: role.name || "",
    });

    function submit(e) {
        e.preventDefault();
        put(route('roles.update', role.id));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className='px-20 mt-10 sm:px-5'>

                <div className='flex space-x-2'>
                    <Link
                        href={route('roles.create')}
                        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        Add Role
                    </Link>

                    <Link
                        href={route('roles.index')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        Roles List
                    </Link>

                </div>

                <div className='mt-10'>

                    <form className='mx-auto' onSubmit={submit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className='text-red-500'>{errors.name}</p>}
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </div>

            </div>
        </AppLayout>
    );
}
