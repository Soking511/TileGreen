import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

// ...existing imports...

@NgModule({
  declarations: [
    // ...existing declarations...
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    // ...existing imports...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }