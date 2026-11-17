import type { VercelConfig ,} from '@vercel/config/v1';
import {deploymentEnv,routes,} from '@vercel/config/v1';

const mainAPIURL = deploymentEnv('VITE_MAIN_API') || 'https://localhost:8080';
const authAPIURL = deploymentEnv('VITE_AUTH_API') || 'https://localhost:8081';
const stockAPIURL = deploymentEnv('VITE_STOCK_API') || 'https://localhost:8082';
export const config: VercelConfig = {
    rewrites: [
        routes.rewrite('/auth/:path*', `${authAPIURL}/:path*`),
        routes.rewrite('/stockAPI/:path*', `${stockAPIURL}/:path*`),
        routes.rewrite('/api/:path*', `${mainAPIURL}/:path*`),
        routes.rewrite('/((?!api/|auth/|stockAPI/).*)', '/index.html'),
    ]
}