import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

import Locate from "@arcgis/core/widgets/Locate.js";
import Search from "@arcgis/core/widgets/Search.js";

@Component({
  selector: 'app-widget-map',
  templateUrl: './widget-map.component.html',
  styleUrls: ['./widget-map.component.css']
})
export class WidgetMapComponent implements  AfterViewInit  {

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

  const toggle = new BasemapToggle({
    view: view,
    nextBasemap: "hybrid"
  });

  let locateWidget = new Locate({
    view: view,

  });

  const searchWidget = new Search({
    view: view
  })

view.ui.add(toggle, "top-right");
view.ui.add(locateWidget, "bottom-right");
view.ui.add(searchWidget, {
  position: "bottom-left",
  index: 2
})

}

ngAfterViewInit(): void {
this.initializeMap();

}

}
