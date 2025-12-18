import { Injectable } from '@angular/core';
import { Nurse } from './nurse';

@Injectable({
  providedIn: 'root',
})
export class NurseData {
  private nurses: Nurse[] = []; // This will eventually have data loaded in by the DB
  private currentNurse: Nurse | null = null;

  // Nurse:
  //
  // name: string
  // email: string
  // imageUrl: string
  register(newNurse: Nurse) : void
  {
    this.nurses.push(newNurse);
  }
  
  login (email: string, password: string) : boolean
  {
    // Nurse is read if the nurse is found by the email provided and the password is correct.
    const nurse = this.nurses.find(n => n.email == email && n.password == password);

    if (!nurse) {
      return false;
    }

    this.currentNurse = nurse;
    return true;
  }

  logout () : void
  {
    this.currentNurse = null;
  }

  isLoggedIn (): boolean
  {
    return this.currentNurse !== null;
  }

  getNurses(): Nurse[]
  {
    return this.nurses;
  }
}

