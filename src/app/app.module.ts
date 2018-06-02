import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AlertModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SignupBarComponent } from './signup-bar/signup-bar.component';
import { ValidateServiceService } from './services/validate-service.service';
import { AuthServiceService } from './services/auth-service.service';
import { UsersService } from './services/users.service';
import { FormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { Http, HttpModule } from '@angular/http';
import { HelpingService } from './services/helping.service';
import { ThreadsService } from './services/threads.service';
import { ThreadComponent } from './thread/thread.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './services/socket.service';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupBarComponent,
    ThreadComponent,
    UsersComponent,
    ProfileComponent,
    ChatComponent,
    CreateThreadComponent,
    NotificationsComponent
    ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AlertModule.forRoot(),
    FormsModule,
    LMarkdownEditorModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [ValidateServiceService, AuthServiceService, HelpingService, ThreadsService, UsersService, SocketService, NotificationsService], 
  bootstrap: [AppComponent]
})
export class AppModule { }



