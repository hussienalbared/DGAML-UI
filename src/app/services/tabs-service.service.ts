import { Injectable } from '@angular/core';
import { tab } from '../components/models/tab.model';

@Injectable()
export class TabsServiceService {
tabs:tab[]=[]
  constructor() { }

  addTab(Tab:tab){
    this.tabs.push(Tab)

  }
  removeTab(index){
    


  

  this.tabs.splice(index, 1);

  }
}

