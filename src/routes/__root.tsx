/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from '@tanstack/react-router'
import appCss from '../styles/app.css?url'

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
        ],
        links: [
            { rel: 'stylesheet', href: appCss },
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