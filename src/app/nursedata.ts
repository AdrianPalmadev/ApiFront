import { Injectable } from '@angular/core';
import { Nurse } from './nurse';

@Injectable({
  providedIn: 'root',
})
export class NurseData {
  private nurses: Nurse[] = []; // This will eventually have data loaded in by the DB.
  private currentNurse: Nurse | null = null; // This should be a cookie.

  /*
  Nurse is composed of the following elements:
  * name: string
  * email: string
  * password: string
  * imageUrl: string
  If any of them are missing, Nurse cannot be built.
  */

  register(newNurse: Nurse) : boolean
  {
    //! API should do this.
    if (this.nurses.find(n => n.email == newNurse.email)) {
      return false;
    }

    this.nurses.push(newNurse);
    return true;
  }
  
  login (email: string, password: string) : boolean
  {
    // Nurse is read if the nurse is found by the email provided and the password is correct.
    const nurse = this.nurses.find(n => n.email == email && n.password == password);

    // The credentials are incorrect? Return an error.
    //! Again, the API should do this. This method should call the API to process the data.
    if (!nurse) {
      return false;
    }

    // Assign this nurse as the current logged user.
    // This should be replaced with a cookie.
    this.currentNurse = nurse;
    return true;
  }

  // This method is incomplete, not only it should be better to clear the cookie,
  // but the API must also know the user has been logged out.
  logout () : void
  {
    this.currentNurse = null;
  }

  isLoggedIn (): boolean
  {
    return this.currentNurse !== null;
  }

  // Use this for search, this should call the API to return data from DB.
  getNurses(): Nurse[]
  {
    return this.nurses;
  }
}

