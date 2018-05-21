import { Injectable } from '@angular/core';

@Injectable()
export class ActiveLinkssService {
links:string[]=[]
  constructor() { }
  add(link)
  {
    this.links.push(link);
  }
  

}
