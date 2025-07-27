import {createRouter as createTanStackRouter, redirect} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
    return createTanStackRouter({
        routeTree,
        scrollRestoration: true,
        notFoundMode: 'root',
        defaultNotFoundComponent: () => {
            throw redirect({to: '/'});
        },
    })
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}