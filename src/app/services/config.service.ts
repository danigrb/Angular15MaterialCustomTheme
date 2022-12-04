import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export  class ConfigService {
  constructor(private httpClient: HttpClient){
    this.load();}

  private config: any;

  /**
   * Use to get the data found in config file
   */
   public getConfig(key: any) {
    return this.config[key];
  }
  public setConfig(config: any) {
   return this.config = config;
 }
 public init() {
  return this.httpClient.get<any>("../assets/config/config.json").toPromise();
}
  public load() {
    return this.httpClient.get("../assets/config/config.json").subscribe(data=>{
      console.log(data);
      this.setConfig(data);
      
    }, error=>{
      
      console.error("Error in keycloak initialitation "+error.valueOf());
    });
  }

  
 
}

