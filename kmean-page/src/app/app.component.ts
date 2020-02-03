import { Component, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RestServiceService } from './rest.service';
import { Subscription } from 'rxjs';

const ROW_SIZE = 28;
const COL_SIZE = 28;
const CHANNELS = 4;

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
    document.getElementById("btn-results").style.display = 'block';
  }

  drawClusters = () => {
    this.clusterLabels.forEach(label => {
      this.drawImage('canvas-label-' + label, this.clusters[label].center);
      this.clusters[label].randoms.forEach((random, i) => {
        this.drawImage('canvas-random-' + label + '-' + i, random);
      })
    })
  }

  drawImage = (canvasId, imgArray) => {
    let canvas: any = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');
    let imageData = ctx.createImageData(ROW_SIZE, COL_SIZE);

    let data = imageData.data;

    for (let i = 0; i < ROW_SIZE * COL_SIZE * CHANNELS; i += 4) {
      data[i] = imgArray[i];
      data[i + 1] = imgArray[i];
      data[i + 2] = imgArray[i];
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  }
}
