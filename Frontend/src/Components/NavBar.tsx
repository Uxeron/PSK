import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from '../text';
import LoginButton from './LoginButton';

export const NavBar = () => {
    const [hover, setHover] = useState(false);
    const { user, isAuthenticated, logout } = useAuth0();
    const showFullNav = window.location.pathname !== '/register';

    return (<>
       <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-3 mx-auto">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex items-center justify-between">
                        <div className="pb-1">
                            <div className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                               {showFullNav ? <Link to={isAuthenticated ? '/browse' : '/'}>
                                    <span>{t.navBar.name}</span>
                                </Link> : <span>{t.navBar.name}</span>}
                            </div>
                        </div>

                        <div className="flex md:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 md:flex md:items-center md:justify-between">
                        {isAuthenticated && showFullNav ? <div className="flex flex-col px-2 py-3 -mx-4 md:flex-row md:mx-0 md:py-0">
                            <div className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2">
                                <Link to="/browse">
                                    <span>{t.navBar.browse}</span>
                                </Link>
                            </div>
                            <div className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 md:mx-2">
                                <Link to="/upload">
                                    <span>{t.navBar.upload}</span>
                                </Link>
                            </div>
                        </div> : <></>}

                        <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8" />

                        <div className="flex items-center mt-4 md:mt-0">
                            {isAuthenticated ? <div><button type="button" onClick={() => setHover(!hover)} className="flex mr-8 items-center focus:outline-none" aria-label="toggle profile dropdown">
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                </div>
                                <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">Vardenis Pavardenis</h3>
                            </button>
                                {hover ?
                                    <div className="mr-8 absolute z-50 max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                        <Link to={`/user/${user?.sub}`}>
                                            <div className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-200 transform dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">Welcome <span className="text-gray-600 dark:text-gray-400">{user?.name}</span></div>
                                        </Link>                                        
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-200 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Settings</a>
                                        <div onClick={() => logout({ returnTo: window.location.origin })} className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-200 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Log out</div>
                                    </div> : undefined}</div> : undefined}
                            {isAuthenticated ? undefined : <LoginButton />}
                        </div>

                    </div>
                </div>
            </div>
        </nav>


    </>
    )
}