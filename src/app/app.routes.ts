import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        canActivate:[authGuard]
    }
];
