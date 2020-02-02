import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {
  constructor(private http: HttpClient) { }

  public getKmeanResults(k: number) {
    return this.http.post("http://localhost:8080/kmean", { k });
  }
}
