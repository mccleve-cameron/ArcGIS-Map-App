import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";

@Component({
  selector: 'app-basic-map',
  templateUrl: './basic-map.component.html',
  styleUrls: ['./basic-map.component.css']
})
export class BasicMapComponent implements AfterViewInit {

  @ViewChild('viewDivRef')
  viewDivNow!: ElementRef;

constructor(){}

initializeMap() {
    console.log("ngAfterViewInit CALLED");
  console.log("this.viewDivNow.nativeElement", this.viewDivNow.nativeElement);


  const map = new ArcGISMap({
    basemap: "dark-gray"
  });


  const view = new MapView({
    map: map,
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
