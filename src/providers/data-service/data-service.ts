import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  public items: any = [];

  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }

  getItems(infiniteScroll?) {
    return new Promise((resolve, reject) => {

      // this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=20')
      this.http.get('https://randomuser.me/api/?results=15&page=${this.page').map(res => res.json()).subscribe(data => {
        this.items = this.items.concat(data.results);
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        resolve(this.items);
      });
    });

  }


  filterItems(searchTerm) {
    return this.items.filter(item => {
      let name = item.name.first + " " + item.name.last;
      return name.toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1;
    });
  }

}