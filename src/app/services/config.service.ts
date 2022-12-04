import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './interface/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  data: Config = {};

  constructor(private http: HttpClient) {}

  load(defaults?: Config): Promise<Config> {
    return new Promise<Config>(resolve => {
      this.http.get('assets/config.json').subscribe(
        response => {
          console.log('using server-side configuration');
          this.data = Object.assign({}, defaults || {}, response || {});
          resolve(this.data);
        },
        () => {
          console.log('using default configuration');
          this.data = Object.assign({}, defaults || {});
          resolve(this.data);
        }
      );
    });
  }

}