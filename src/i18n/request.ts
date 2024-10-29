import {getRequestConfig} from 'next-intl/server';
import {cookies} from "next/headers";

export default getRequestConfig(async () => {
    const cookie = await cookies();
    const locale = cookie.get('language')?.value ?? 'fr';
    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});