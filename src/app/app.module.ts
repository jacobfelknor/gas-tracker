import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PickCarComponent } from './pick-car/pick-car.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { NewDataComponent } from './new-data/new-data.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PickCarComponent,
    ViewDataComponent,
    NewDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
