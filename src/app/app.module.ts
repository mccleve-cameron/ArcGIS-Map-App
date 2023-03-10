import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { WebMapComponent } from './web-map/web-map.component';
import { WidgetMapComponent } from './widget-map/widget-map.component';
import { LegendWidgetComponent } from './legend-widget/legend-widget.component';
import { PopupMapComponent } from './popup-map/popup-map.component';
import { DistanceCalulatorComponent } from './distance-calulator/distance-calulator.component';
import { NewDistanceCalulatorComponent } from './new-distance-calulator/new-distance-calulator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BasicMapComponent,
    WebMapComponent,
    WidgetMapComponent,
    LegendWidgetComponent,
    PopupMapComponent,
    DistanceCalulatorComponent,
    NewDistanceCalulatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
