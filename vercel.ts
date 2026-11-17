import type { VercelConfig } from '@vercel/config/v1';

const mainAPIURL = import.meta.env.VITE_MAIN_API || 'https://localhost:8080';
const authAPIURL = import.meta.env.VITE_AUTH_API || 'https://localhost:8081';
const stockAPIURL = import.meta.env.VITE_STOCK_API || 'https://localhost:8082';
export const config: VercelConfig = {
    rewrites: [
        {
            source: '/api/:path*',
            destination: `${mainAPIURL}/:path*`,
        },
        {
            source: '/auth/:path*',
            destination: `${authAPIURL}/:path*`,
        },
        {  
            source: '/stockAPI/:path*', 
            destination: `${stockAPIURL}/:path*` ,
        },
        {
            source: "/((?!api/|auth/|stockAPI/).*)",
            destination: "/index.html"
        }
    ]
}