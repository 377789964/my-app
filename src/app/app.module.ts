import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StarsComponent } from './components/stars/stars.component';
import { StockComponent } from './components/stock/stock.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SrarchComponent } from './components/srarch/srarch.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';

import { ProductService } from "./shared/product.service";
import { FilterPipe } from './pipe/filter.pipe'

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    StarsComponent,
    StockComponent,
    NavbarComponent,
    SrarchComponent,
    CarouselComponent,
    ProductComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    // NgModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
