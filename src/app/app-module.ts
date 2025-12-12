import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { App } from './app.componenet';
import { AppRoutingModule } from './app-routing-module';
import { AuthModule } from './auth/auth-module';
import { AuthInterceptor } from './core/interceptor/auth-interceptor';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, RouterModule, AppRoutingModule, AuthModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
