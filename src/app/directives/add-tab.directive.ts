import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TabsServiceService } from '../services/tabs-service.service';

@Directive({
  selector: '[appAddTab]'
})
export class AddTabDirective {
  @Input() path: string;
  constructor(private el: ElementRef,private tabService:TabsServiceService) { 
  
  }
  @HostListener('click') onMouseEnter() {
 this.tabService.addTab({path:this.path,label:this.path})
  }
  
}
