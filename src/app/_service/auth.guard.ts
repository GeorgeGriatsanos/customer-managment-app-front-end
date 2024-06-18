import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from './master.service';

export const authGuard: CanActivateFn = (route, state) => {

  let service = inject(MasterService)
  let router = inject(Router)
  if (service.haveAccess()) {
    return true
  } else {
    alert ('unauthorized access')
    router.navigate(['/'])
    return false
  }
  
};
