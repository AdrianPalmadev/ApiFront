import { Injectable } from '@angular/core';
import { Nurse } from './nurse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from './environments/environments';

@Injectable({
  providedIn: 'root',
})
export class NurseData {
  constructor(
    private conexHttp: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  private url = environment.url;

  /*
  Nurse is composed of the following elements:
  * name: string
  * email: string
  * password: string
  * imageUrl: string
  If any of them are missing, Nurse cannot be built.
  */

  register(newNurse: Nurse): Observable<Nurse> {
    return this.conexHttp.post<Nurse>(this.url + 'create', newNurse).pipe(
      // If there's an error in the request, this logic handles the error and displays it to the user.
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while registering the nurse.';

        if (error.status === 0) {
          errorMessage = 'Cannot connect to server. Please check your connection.';
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = `Client error: ${error.error.message}`;
        } else {
          // Try to extract the API's error message
          // This handles both 'error' and 'message' properties from the API responses
          errorMessage = error.error?.error || error.error?.message || errorMessage;
          
          // If no custom message, use status-based fallback
          if (errorMessage === 'An error occurred while registering the nurse.') {
            switch (error.status) {
              case 400:
                errorMessage = 'Invalid request. Please check your input.';
                break;
              case 500:
                errorMessage = 'Server error. Please try again later.';
                break;
              default:
                errorMessage = `Server returned error ${error.status}`;
            }
          }
        }

        return throwError(() => new Error(errorMessage));
      }),
      tap(() => {
        this.router.navigate(['/login']);
      }),
    );
  }

  login(email: string, password: string): Observable<Nurse> {
    // Nurse is read if the nurse is found by the email provided and the password is correct.
    return this.conexHttp.post<Nurse>(this.url + 'login', { email, password }).pipe(
      // Load a cookie containing nurse data, this is useful to keep data stable during the user's stance on the website.
      tap((nurse: Nurse) => {
        this.cookieService.set('currentNurse', JSON.stringify(nurse));

        this.cookieService.set(
          'currentNurse',
          JSON.stringify(nurse),
          1, // Expires in 24h
          '/',
          undefined,
          true,
          'Strict',
        );
      }),
      // Are the credentials incorrect? Return an error and do nothing.
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred while logging in.';
      
        if (error.status === 0) {
          errorMessage = 'Cannot connect to server. Please check your connection.';
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = `Client error: ${error.error.message}`;
        } else {
          // Try to extract the API's error message
          // This handles both 'error' and 'message' properties from the API responses
          errorMessage = error.error?.error || error.error?.message || errorMessage;
          
          // If no custom message, use status-based fallback
          if (errorMessage === 'An error occurred while logging in.') {
            switch (error.status) {
              case 400:
                errorMessage = 'Invalid request. Please check your input.';
                break;
              case 404:
                errorMessage = 'Login failed. Please check your credentials.';
                break;
              case 500:
                errorMessage = 'Server error. Please try again later.';
                break;
              default:
                errorMessage = `Server returned error ${error.status}`;
            }
          }
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // This method clears the cookie set by login and returns the user back to the login page.
  logout(): void {
    this.cookieService.delete('currentNurse');
    // Returns the user to the login page.
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('currentNurse');
  }

  getAllNurses(): Observable<Nurse[]> {
    return this.conexHttp.get<Nurse[]>(this.url + 'index');
  }

  searchByName(name: string): Observable<Nurse[]> {
    return this.conexHttp.get<Nurse[]>(this.url + 'name/' + name);
  }
}
