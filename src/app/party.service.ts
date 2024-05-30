import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PartyService {

  constructor(private http:HttpClient) { }

  apiUrl:string = 'https://ap.greatfuturetechno.com'

  getAllParty = async () => {
    try {
      const response = await this.http.get(this.apiUrl + '/party/').toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching parties:', error);
      throw error;
    }
  }

  deleteParty = async (id : number) => {
    try {
      const response = await this.http.delete(this.apiUrl + `/party/?id=${id}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching parties:', error);
      throw error;
    }
  }

  addParty = async (data : any) => {
    try {
      const response = await this.http.post(this.apiUrl + '/party/', data).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching parties:', error);
      throw error;
    }
  }

  updateParty = async (data : any) => {
    try {
      const response = await this.http.put(this.apiUrl + `/party/?id=${data.id}`, data).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching parties:', error);
      throw error;
    }
  }

  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  
}
