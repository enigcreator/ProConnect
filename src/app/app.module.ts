import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
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
import { SuiModule} from 'ng2-semantic-ui';
import { SignInComponent } from './sign-in/sign-in.component';
import { SplashComponent } from './splash/splash.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MarkdownModule } from 'ngx-markdown';
import { NguUtilityModule} from "ngu-utility/dist";
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from './material.module';
import { MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ng2-avatar';
import { AceEditorModule } from 'ng2-ace-editor';
import { FileSelectDirective } from 'ng2-file-upload';
import { UserThreadsComponent } from './user-threads/user-threads.component';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { DeepHomeComponent } from './deep-home/deep-home.component';
import { ConversationComponent } from './conversation/conversation.component';
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
    SplashComponent,
    CreateThreadComponent,
    NotificationsComponent,
    SignInComponent,
    DialogComponent,
    FileSelectDirective,
    UserThreadsComponent,
    DeepHomeComponent,
    ConversationComponent   ],
  imports: [
    AceEditorModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    AvatarModule.forRoot(), 
    AngularFontAwesomeModule,
    AlertModule.forRoot(),
    FormsModule,
    BrowserModule,
    InfiniteScrollModule,
    LMarkdownEditorModule,
    NgFlashMessagesModule.forRoot(),
    MarkdownModule.forRoot(),
    NguUtilityModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxAutoScrollModule
  ],
  entryComponents: [DialogComponent],
  providers: [ ValidateServiceService, AuthServiceService, HelpingService, ThreadsService, UsersService, SocketService, NotificationsService], 
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);


