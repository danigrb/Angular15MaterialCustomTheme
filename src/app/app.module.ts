import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ConfigService } from './services/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
export function setupConfigServiceFactory(
  service: ConfigService
): Function {
  return () => service.load();
}
   
export function initializeKeycloakConfigMap(keycloak: KeycloakService,configService : ConfigService) {
  return ()=>  configService.init().then(res =>  {
    
            return res["activate_keycloak"]?
                    keycloak.init({
                    config: {
                      url: res["keycloak_url"],
                      realm:  res["keycloak_realm"],
                      clientId:  res["keycloak_client_id"],
                    },
                    initOptions: {
                      onLoad: 'login-required',
                      silentCheckSsoRedirectUri:
                        window.location.origin + '/assets/silent-check-sso.html',
                    },
                  })
                  :true;
        }
      );

}
const configServiceFactory = (httpClient : HttpClient) => {
  return new ConfigService(httpClient);
};
export let configurationServiceProvider = 
{
  provide: ConfigService,
  useFactory: configServiceFactory,
  deps: [HttpClient],
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [configurationServiceProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloakConfigMap,
      multi: true,
      deps: [KeycloakService,ConfigService],
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
