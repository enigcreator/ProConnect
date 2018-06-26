import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupBarComponent } from './signup-bar/signup-bar.component';
import { SplashComponent } from './splash/splash.component'
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'thread/:id', component: ThreadComponent},
  { path: 'users', component: UsersComponent},
  { path: 'chat/:id', component: ChatComponent},
  { path: 'ask', component: CreateThreadComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignupBarComponent},
  { path: 'splash', component: SplashComponent}
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
