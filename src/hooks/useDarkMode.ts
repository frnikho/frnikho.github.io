'use client';

export default function useDarkMode(name: string = 'dark') {

    const toggle = () => {
        if (document.documentElement.classList.contains(name)) {
            document.documentElement.classList.remove(name);
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add(name);
            localStorage.setItem('theme', name);
        }
    }

    const load = (): string => {
        const theme = localStorage.getItem('theme');
        if (theme === name) {
            document.documentElement.classList.add(name);
        }
        return theme ?? 'light';
    }

    return {
        toggle,
        load,
    }
}