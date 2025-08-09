
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit User',
        href: '/users'
    },
];

export default function Edit({user, roles, userRoles}) {

    const { data, setData, errors, put} = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        roles: userRoles || [],
    });

    function handleCheckboxChange(roleName, checked){
        if(checked){
            setData("roles", [...data.roles, roleName]);
        }else{
            setData("roles", data.roles.filter(name => name !== roleName));
        }
    }

    function submit(e) {
        e.preventDefault();
        put(route('users.update', user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className='px-20 mt-10 sm:px-5'>

                <div className='flex space-x-2'>
                    <Link
                        href={route('users.create')}
                        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        Add User
                    </Link>

                    <Link
                        href={route('users.index')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        User List
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

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="example@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className='text-red-500'>{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}                                    
                                />
                                {errors.password && <p className='text-red-500'>{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}                                    
                                />
                                {errors.password_confirmation && <p className='text-red-500'>{errors.password_confirmation}</p>}
                            </div>

                           
                            <div>
                                <label htmlFor={roles} className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Roles
                                </label>
                                <div className=''>
                                    {roles.map(role => (
                                        <div key={role} className="flex items-center py-2">
                                            <input
                                                type="checkbox"
                                                value={role}
                                                checked={data.roles.includes(role)}
                                                onChange={(e) => handleCheckboxChange(role, e.target.checked)}
                                                id={role}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                                            />
                                            <label className="ml-3" htmlFor={role}>{role}</label>
                                        </div>
                                    ))}
                                </div>                                
                                {errors.roles && <p className='text-red-500'>{errors.roles}</p>}
                            </div>

                        </div>
                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </div>

            </div>
        </AppLayout>
    );
}
