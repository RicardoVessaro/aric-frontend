import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth/auth.guard';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
    {   path: '', redirectTo: '/home', pathMatch: 'full'  },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [authGuard]
    },
    {
        path: 'signin',
        component: SignInComponent,
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {
        path: 'feed',
        component: FeedComponent,
        canActivate: [authGuard]
    },
    {   path: '**', redirectTo: '/home', pathMatch: 'full' },
];
