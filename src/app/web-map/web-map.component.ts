import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import WebMap from "@arcgis/core/WebMap.js";



@Component({
  selector: 'app-web-map',
  templateUrl: './web-map.component.html',
  styleUrls: ['./web-map.component.css']
})
export class WebMapComponent implements AfterViewInit  {

  @ViewChild('viewDivRef')
  viewDivNow!: ElementRef;

constructor(){}

initializeMap() {
    console.log("ngAfterViewInit CALLED");
  console.log("this.viewDivNow.nativeElement", this.viewDivNow.nativeElement);


  const map = new ArcGISMap({
    basemap: "dark-gray"
  });

  const webmap = new WebMap({
portalItem: {
  id: "f2e9b762544945f390ca4ac3671cfa72"
}
  });


  const view = new MapView({
    map: webmap,
    container: this.viewDivNow.nativeElement,
    zoom: 4,
    center: [-100, 34]
  });

  view.when(() => {
    view.ready;
    console.log("Map is loaded");
  })

}

ngAfterViewInit(): void {
this.initializeMap();

}

}
