
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Role',
        href: '/roles'
    },
];

export default function Create({ permissions }) {

    const { data, setData, errors, post } = useForm({
        name: "",
        permissions: [],
    });

    function handleCheckboxChange(permissionName, checked){
        if(checked){
            setData("permissions", [...data.permissions, permissionName]);
        }else{
            setData("permissions", data.permissions.filter(name => name !== permissionName));
        }
    }


    function submit(e) {
        e.preventDefault();
        post(route('roles.store'));
    }
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

                    <form className='mx-auto' onSubmit={submit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Super Admin / Admin / User"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className='text-red-500'>{errors.name}</p>}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Permissions
                                </label>
                                <div className='grid grid-cols-4 gap-4'>
                                    {permissions.map(permission => (
                                        <div key={permission} className="flex items-center py-2">
                                            <input
                                                type="checkbox"
                                                value={permission}
                                                onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
                                                id={permission}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                                            />
                                            <label className="ml-3" htmlFor={permission}>{permission}</label>
                                        </div>
                                    ))}
                                </div>                                
                                {errors.permissions && <p className='text-red-500'>{errors.permissions}</p>}
                            </div>
                        </div>

                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </div>

            </div>
        </AppLayout>
    );
}
