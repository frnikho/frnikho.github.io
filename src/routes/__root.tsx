/// <reference types="vite/client" />
import appCss from '../styles/app.css?url'
import {
    createRootRoute,
    HeadContent,
    Outlet,
    Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

import '../styles/app.css';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Nicolas SANS - Portfolio',
            },
            {
                name: 'description',
                content: 'Nicolas SANS, développeur web fullstack spécialisé dans la création de sites et d\'applications web modernes et performants.',
            },
            {
                name: 'keywords',
                content: 'Nicolas SANS, portfolio, développeur web, fullstack, sites web, applications web, développement web',
            },
            {
                name: 'author',
                content: 'Nicolas SANS',
            },
            {
                property: 'og:title',
                content: 'Nicolas SANS - Portfolio'
            },
            {
                property: 'og:description',
                content: 'Nicolas SANS, développeur web fullstack spécialisé dans la création de sites et d\'applications web modernes et performants.'
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'og:image',
                content: '/android-chrome-192x192.png'
            },
            {
                property: 'og:url',
                content: 'https://nikho.dev'
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                name: 'twitter:title',
                content: 'Nicolas SANS - Portfolio'
            },
            {
                name: 'twitter:description',
                content: 'Nicolas SANS, développeur web fullstack spécialisé dans la création de sites et d\'applications web modernes et performants.'
            },
            {
                name: 'twitter:image',
                content: '/android-chrome-192x192.png'
            }
        ],
        links: [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
            { rel: 'preconnect', href: "https://fonts.gstatic.com", crossOrigin: 'anonymous'},
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap'},
            { rel: 'icon', href: '/android-chrome-192x192.ico' },
        ]
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang={'fr'}>
        <head>
            <HeadContent />
        </head>
        <body>
            {children}
        <Scripts />
        </body>
        </html>
    )
}