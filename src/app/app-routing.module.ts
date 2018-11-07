import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
// import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component"

const routes: Routes = [
  {path: "", redirectTo: "/Home", pathMatch: "full"},
  {path: "Home", component: HomeComponent},
  {path: "ProductDetail/:id", component: ProductDetailComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
