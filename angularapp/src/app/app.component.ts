import { Component } from '@angular/core';
import { loadImages } from 'src/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false;
  notificationText: string | null = null;
  images: Image[] = [];
  page = "home"
  searchParam = ""

  async search() {
    this.isLoading = true
    const response = await loadImages(this.searchParam)
    this.isLoading = false
    if (!response.success) {
      this.notificationText = response.error
    } else {
    const data = response.data
    this.images = data.map(img => ({...img, smallAmount: 0, largeAmount: 0}))
    this.notificationText = null
    }
  }
}

type Image = {
  id: number;
  title: string;
  url: string;
  smallAmount: number;
  largeAmount: number;
};
