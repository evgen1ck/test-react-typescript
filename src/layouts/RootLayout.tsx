import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {

    interface ILink {
        name: string
        link: string
    }
    const initialLinks: ILink[] = [
        {
            name: 'Главная',
            link: '/'
        },
        {
            name: 'Новости',
            link: 'news'
        },
        {
            name: 'Поддержка',
            link: 'support'
        },
        {
            name: 'О нас',
            link: 'about'
        }
    ]
    const [links] = useState(initialLinks)

    return (
        <>
            <header className="bg-light-additional dark:bg-dark-additional top-0 z-40 flex-none w-full mx-auto shadow-md">
                <nav className="flex items-center justify-between flex-wrap p-6 max-w-6xl m-auto">
                    <div className="flex items-center flex-shrink-0 mr-6">
                        <Link to="/" className="hover:text-light-focusing dark:hover:text-dark-focusing">
                            <span className="font-semibold text-2xl tracking-tight uppercase">Evgenick's digitals</span>
                        </Link>
                    </div>
                    <div className="block lg:hidden">
                        <button className="flex items-center px-3 py-2 border rounded">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ">
                        <div className="lg:flex-grow">
                            {links.map(link => {
                                return (
                                    <Link to={link.link} key={link.name} className="btn-classic select-none block lg:inline-block lg:mt-0 ml-4">
                                        {link.name}
                                    </Link>
                                )})
                            }
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="lg:flex-grow">
                                <Link to="/registration" className="btn-classic select-none block lg:inline-block lg:mt-0 ml-4 mr-6">
                                    Зарегистрироваться
                                </Link>
                                <Link to="/authorization" className="btn-classic-frame select-none bg-light-additional dark:bg-dark-additional block lg:inline-block py-2 uppercase max-w-md:hidden inline-block px-4 mt-4 lg:mt-0">
                                    Войти
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>



            <Outlet />



            <footer className="bg-light-additional dark:bg-dark-additional py-6 text-sm drop-shadow-sm">
                <div className="w-full px-6 mx-auto max-w-6xl lg:justify-between lg:flex flex-wrap grid text-center lg:space-y-0 space-y-2">
                    <span>
                        <Link to="/" className="hover:underline uppercase">Evgenick's digitals</Link> © Copyright {new Date().getFullYear() + " "}
                    </span>
                    <span>
                        <a>Сделано </a><a href="https://helloworld.evgenick.com" className="underline">Кочетковым Евгением</a>
                    </span>
                </div>
            </footer>
        </>
    );
}