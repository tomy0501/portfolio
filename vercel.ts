import type { VercelConfig ,} from '@vercel/config/v1';
import {deploymentEnv,routes,} from '@vercel/config/v1';

const mainAPIURL = deploymentEnv('VITE_MAIN_API_URL');
const authAPIURL = deploymentEnv('VITE_AUTH_API_URL');
const stockAPIURL = deploymentEnv('VITE_STOCK_API_URL');
if(!mainAPIURL || !authAPIURL || !stockAPIURL) {
    throw new Error("API URL is not defined in environment variables");
}
export const config: VercelConfig = {
    rewrites: [
        routes.rewrite('/auth/(.*)', `${authAPIURL}/$1`),
        routes.rewrite('/stockAPI/(.*)', `${stockAPIURL}/$1`),
        routes.rewrite('/api/(.*)', `${mainAPIURL}/$1`),
        routes.rewrite('/((?!api/|auth/|stockAPI/).*)', '/index.html'),
    ]
}