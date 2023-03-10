import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";



@Component({
  selector: 'app-new-distance-calulator',
  templateUrl: './new-distance-calulator.component.html',
  styleUrls: ['./new-distance-calulator.component.css']
})
export class NewDistanceCalulatorComponent implements OnInit {

    private map!: Map;
    public view!: MapView;

    public point1!: string;
    public point2!: string;
    public distance!: number;

    ngOnInit() {
      this.map = new Map({
        basemap: 'streets-navigation-vector'
      });

      this.view = new MapView({
        container: 'viewDiv',
        map: this.map,
        center: [-118.805, 34.027],
        zoom: 13
      });
    }

    public calculateDistance() {
      const [x1, y1] = this.point1.split(',').map(parseFloat);
      const [x2, y2] = this.point2.split(',').map(parseFloat);

      const point1 = {
        type: 'point',
        x: x1,
        y: y1,
        spatialReference: {
          wkid: 4326
        }
      };

      const point2 = {
        type: 'point',
        x: x2,
        y: y2,
        spatialReference: {
          wkid: 4326
        }
      };

      const distanceMeters = geometryEngine.distance(point1, point2, "feet");

      this.distance = distanceMeters / 1000;
    }

  }

