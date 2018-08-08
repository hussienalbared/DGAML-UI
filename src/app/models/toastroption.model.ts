
import {ToastOptions} from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
export class toastoption extends ToastOptions{
    translate: TranslateService;

    positionClass= 'toast-top-center' ;
}