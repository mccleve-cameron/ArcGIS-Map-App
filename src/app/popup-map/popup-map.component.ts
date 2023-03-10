import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map.js';
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";

import * as locator from "@arcgis/core/rest/locator.js";
import WebMap from "@arcgis/core/WebMap.js";

@Component({
  selector: 'app-popup-map',
  templateUrl: './popup-map.component.html',
  styleUrls: ['./popup-map.component.css']
})
export class PopupMapComponent implements AfterViewInit  {

  @ViewChild('viewDivRef')
  viewDivNow!: ElementRef;

constructor(){}

initializeMap() {
  const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  // Create the Map
  const map = new Map({
    basemap: "streets-navigation-vector"
  });

  // Create the MapView
  const view = new MapView({
    container: this.viewDivNow.nativeElement,
    map: map,
    center: [-111.783, 43.826],
    zoom: 13
  });


  view.popup.autoOpenEnabled = false;
  view.on("click", (event) => {
      // Get the coordinates of the click on the view
  // around the decimals to 3 decimals
    const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
    const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

    view.popup.open({
      title: "Reverse geocode: [" + lon + ", " + lat + "]",  // Set the popup's title to the coordinates of the clicked location
      location: event.mapPoint // Set the location of the popup to the clicked location
    });

    const params = {
      location: event.mapPoint
    };

    // Execute a reverse geocode using the clicked location
    locator
      .locationToAddress(locatorUrl, params)
      .then((response) => {
        // If an address is successfully found, show it in the popup's content
        view.popup.content = response.address;
      })
      .catch(() => {
        // If the promise fails and no result is found, show a generic message
        view.popup.content = "No address was found for this location";
      });

      });



}

ngAfterViewInit(): void {
this.initializeMap();

}

}
