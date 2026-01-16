import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { AuthModule } from './auth/auth-module';
import { TokenInterceptor } from './core/interceptor/auth-interceptor';
import { GlobalErrorHandler } from './core/services/global-error-handler';
import { SharedModule } from './shared/shared-module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
