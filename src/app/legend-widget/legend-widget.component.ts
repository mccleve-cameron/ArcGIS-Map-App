import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import WebMap from "@arcgis/core/WebMap.js";
import Legend from '@arcgis/core/widgets/Legend';

@Component({
  selector: 'app-legend-widget',
  templateUrl: './legend-widget.component.html',
  styleUrls: ['./legend-widget.component.css']
})
export class LegendWidgetComponent implements AfterViewInit  {

  @ViewChild('viewDivRef')
  viewDivNow!: ElementRef;

constructor(){}

initializeMap() {
    console.log("ngAfterViewInit CALLED");
  console.log("this.viewDivNow.nativeElement", this.viewDivNow.nativeElement);


  const webmap = new WebMap({
portalItem: {
  // id: "f2e9b762544945f390ca4ac3671cfa72"
  id: "05e015c5f0314db9a487a9b46cb37eca"
}
  });


  const view = new MapView({
    map: webmap,
    container: this.viewDivNow.nativeElement,
    // zoom: 4,
    // center: [-100, 34]
  });

  view.when(() => {
    const featureLayer = webmap.layers.getItemAt(0);

    let legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: featureLayer,
          title: "NY Educational Attainment"
        }
      ]
    });

    view.ui.add(legend, "bottom-right");
  });

}

ngAfterViewInit(): void {
this.initializeMap();

}

}
