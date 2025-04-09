import { environment } from "../environments/environment.development";

export const appRoutes = {
    login: 'login',
    dashboard: 'dashboard',
    reports: 'reports',
    runningHistory: 'running-history',
    root: 'root'
} as const;

export type RouteKeys = keyof typeof appRoutes;

const domain  = environment.url;
export const APIs = {
    login: `${domain}/Auth/Login`,
    logout: `${domain}/Auth/Logout`,
    validateToken: `${domain}/Auth/ValidateToken`,
    getData: `${domain}/Data/GetAll`,
    uploadFile: `${domain}/File/Upload`,
    sendReport: `${domain}/Report`
};

