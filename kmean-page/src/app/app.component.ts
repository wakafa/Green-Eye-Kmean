import { Component, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RestServiceService } from './rest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'kmean-page';
  _baseUrl: string;
  k: number = 2;
  clusters: any;
  clusterLabels: string[];

  constructor(private http: HttpClient, private restService: RestServiceService) { }

  sendHello = () => { console.log(this.k) };

  updatek = (newk: number) => { this.k = newk; };

  calculateKmean = () => {
    this.restService.getKmeanResults(this.k).subscribe(res => {
      this.clusters = (res as any).clusters;
      this.clusterLabels = Object.keys(this.clusters);
    })
  }
}
