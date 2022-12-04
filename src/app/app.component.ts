import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

    constructor(appConfig: ConfigService) {
      this.title = appConfig.getConfig("title")??'app';
      console.log(appConfig.getConfig("title"));
  }
}
