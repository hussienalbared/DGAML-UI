import { Injectable } from '@angular/core';
import { tab } from '../components/models/tab.model';

@Injectable()
export class TabsServiceService {
tabs:tab[]=[]
  constructor() { }

  addTab(Tab:tab){
    let index=this.tabs.findIndex(t=>(t.label==Tab.label&&t.path==Tab.path))
    if(index==-1)
    this.tabs.push(Tab)

  }
  removeTab(Tab:tab){
    let index=this.tabs.findIndex(t=>(t.label==Tab.label&&t.path==Tab.path))
    


  
if(index>-1)
  this.tabs.splice(index, 1);

  }
}

