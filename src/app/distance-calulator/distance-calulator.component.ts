import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView.js';
import Measurement from '@arcgis/core/widgets/Measurement';
import WebMap from "@arcgis/core/WebMap.js";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D.js";
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D.js";

@Component({
  selector: 'app-distance-calulator',
  templateUrl: './distance-calulator.component.html',
  styleUrls: ['./distance-calulator.component.css'],
})
export class DistanceCalulatorComponent implements AfterViewInit {
  @ViewChild('viewDivRef') viewDivNow!: ElementRef;
  @ViewChild('distance') distanceButton!: ElementRef;
  @ViewChild('area') areaButton!: ElementRef;

  positionA: any;
  positionB: any = 0;
  clicks: number = 0;

  constructor() {}

  async initializeMap() {
    let activeWidget: any = null;

    // load a webmap
    const webmap = new WebMap({
      portalItem: {
        id: "990d0191f2574db495c4304a01c3e65b"
      }
    });

    // create the map view
    const view = new MapView({
      container: "viewDiv",
      map: webmap
    });

    // add the toolbar for the measurement widgets
    view.ui.add("topbar", "top-right");


    // // Create the MapView
    // const activeView = new MapView({
    //   container: this.viewDivNow.nativeElement,
    //   map: map,
    //   center: [-111.783, 43.826],
    //   zoom: 13,
    // });

    const measurement = new Measurement();

    // Set-up event handlers for buttons and click events
    const distanceButton = this.distanceButton.nativeElement;
    const areaButton = this.areaButton.nativeElement;

    distanceButton.addEventListener('click', () => {
      setActiveWidget(null);
      if (this) {
        console.log(this)
      }
      // if (!this.classList.contains("active")) {
      //   setActiveWidget("distance");
      // } else {
      //   setActiveButton(null);
      // }
    });

    areaButton.addEventListener('click', () => {
      setActiveWidget(null);
      // if (!this.classList.contains("active")) {
      //   setActiveWidget("area");
      // } else {
      //   setActiveButton(null);
      // }
    });

    function setActiveWidget(type:any) {
      switch (type) {
        case "distance":
          activeWidget = new DistanceMeasurement2D({
            view: view
          });

          // skip the initial 'new measurement' button
          activeWidget.viewModel.start();

          view.ui.add(activeWidget, "top-right");
          setActiveButton(distanceButton);
          break;
        case "area":
          activeWidget = new AreaMeasurement2D({
            view: view
          });

          // skip the initial 'new measurement' button
          activeWidget.viewModel.start();

          view.ui.add(activeWidget, "top-right");
          setActiveButton(areaButton);
          break;
        case null:
          if (activeWidget) {
            view.ui.remove(activeWidget);
            activeWidget.destroy();
            activeWidget = null;
          }
          break;
      }
    }

    function setActiveButton(selectedButton:any) {
      // focus the view to activate keyboard shortcuts for sketching
      view.focus();
      // let elements = document.getElementsByClassName("active");
      // for (let i = 0; i < elements.length; i++) {
      //   elements[i].classList.remove("active");
      // }
      // if (selectedButton) {
      //   selectedButton.classList.add("active");
      // }
    }

  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }
}

// view.on('click', (event) => {
//   // Get the coordinates of the click on the view
//   // around the decimals to 3 decimals
//   const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
//   const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

//   if (this.clicks == 0) {
//     this.positionA = event.mapPoint;
//     this.clicks += 1;

//     view.popup.open({
//       title: 'Reverse geocode: [' + lon + ', ' + lat + ']', // Set the popup's title to the coordinates of the clicked location
//       location: event.mapPoint, // Set the location of the popup to the clicked location
//     });

//     const params = {
//       location: event.mapPoint,
//     };

//     // Execute a reverse geocode using the clicked location
//     locator
//       .locationToAddress(locatorUrl, params)
//       .then((response) => {
//         // If an address is successfully found, show it in the popup's content
//         view.popup.content = response.address;
//       })
//       .catch(() => {
//         // If the promise fails and no result is found, show a generic message
//         view.popup.content = 'No address was found for this location';
//       });
//   }
//   else if (this.clicks == 1) {
//     this.positionB = event.mapPoint;
//     this.clicks = 0;

//   view.popup.open({
//     title: 'Reverse geocode: [' + lon + ', ' + lat + ']', // Set the popup's title to the coordinates of the clicked location
//     location: event.mapPoint, // Set the location of the popup to the clicked location
//   });

//   const params = {
//     location: event.mapPoint,
//   };

//   // Execute a reverse geocode using the clicked location
//   locator
//     .locationToAddress(locatorUrl, params)
//     .then((response) => {
//       // If an address is successfully found, show it in the popup's content
//       view.popup.content = response.address;
//     })
//     .catch(() => {
//       // If the promise fails and no result is found, show a generic message
//       view.popup.content = 'No address was found for this location';
//     });
//   }

//   console.log("this.positionA", this.positionA.latitude)
//   console.log("this.positionB", this.positionB.latitude)
// });
