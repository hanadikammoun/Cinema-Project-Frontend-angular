import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  public  host:string ="http://localhost:8080";

  constructor( private http:HttpClient) { }
  public getVille(){
    return this.http.get(this.host+"/villes")
  }

  getCinema(v) {
    return this.http.get(v._links.cinemas.href);

  }

  getSalles(c) {
    return this.http.get(c._links.salles.href);
  }

  getProjection(salle) {
    let url =salle._links.projections.href.replace("{?projection}","");
    console.log(url+"?projection=p1");
    return this.http.get(url+"?projection=p1");

  }
  getTicketPlace(p){
    let url =p._links.tickets.href.replace("{?projection}","");
    console.log(url+"?projection=ticketProj");
    return this.http.get(url+"?projection=ticketProj");
  }

  payerTicket(f: any) {
    return this.http.post(this.host+"/payerTickets",f);
  }
}
