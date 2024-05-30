import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string = 'https://ap.greatfuturetechno.com';
  token:string = '';


  constructor(private http:HttpClient,private router:Router) { }


  login = async (payload : any) => {
    try {
      const response : any = await this.http.post(this.apiUrl + '/login/', payload).toPromise();
      localStorage.setItem('token',response.token)
      this.token = response.token;
      return response;
    } catch (error) {
      console.error('Error fetching parties:', error);
      throw error;
    }
  }


  logout = async () => {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  getToken = () => {
    return localStorage.getItem('token');
  }
}
