import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  static settings: any;

  constructor(private readonly http: HttpClient) {}

  load() {
    let jsonFile = `config/local/config.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: any) => {
          AppConfig.settings = response;
          resolve();
        })
        .catch((response) => {
          reject(
            `Não foi possível ler o arquivo '${jsonFile}': ${JSON.stringify(
              response
            )}`
          );
        });
    });
  }
}
