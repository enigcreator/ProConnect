import { Injectable } from '@angular/core';

@Injectable()
export class ValidateServiceService {

  constructor() { }


  validateRegister(user) {
    if(user.display_name == undefined || user.email == undefined || user.location == undefined || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }

  validateDisplayName(display_name){
  const re = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]*$/;
  if (re.test(display_name))
    {
      const re_next = /(.*[a-z]){3}/i;
      return re_next.test(display_name);
    }
    else
    return false;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  validatePassword(password) {
    const re = /(.*[a-z0-9]){8}/i;
    return re.test(password);
  }

}
