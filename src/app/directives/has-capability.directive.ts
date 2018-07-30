import { Directive, Input, HostListener, ElementRef, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[userHasCapability]'
})
export class userHasCapabilityDirective implements OnInit{
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,private auth:AuthService) { }
    ngOnInit() {
    
      let condition=!this.auth.has_Capabilities(this.roleName);
     
      if (!condition && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (condition && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
    @Input("userHasCapability") roleName : string;
}
