

import { Component, OnInit } from "@angular/core";
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from "../../providers/data-service/data-service";
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailsPage } from '../details/details'

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;
  page = 0;
  maximumPages = 5;

  constructor(private dataService: DataServiceProvider, public navCtrl: NavController, public http: Http) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.dataService.getItems().then(
      (res) => {
        this.items = res;
      }
    );
  }

  loadMore(infiniteScroll) {
    this.page++;
    this.dataService.getItems(infiniteScroll).then(
      (res) => {
        this.items = res;
      }
    );

    if (this.page === this.maximumPages) {
      infiniteScroll.enable(false);
    }
  }

  onSearchInput() {
    this.searching = true;
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm);
  }

  goToDetails(data) {
    this.navCtrl.push(DetailsPage, { data: data });
  }
}
