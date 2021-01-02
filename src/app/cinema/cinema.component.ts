import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../sevices/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public  villes;
  public cinemas;
  public salles;
  public currentVille;
  public currentCinema;
  public currentProjection;
  public projections;
  public selectedTicket: any[];

  constructor(public  cinemaService:CinemaService) { }

  ngOnInit(): void {

    this.cinemaService.getVille()
      .subscribe( data =>{
        this.villes=data;
        },err=>{
        console.log(err);
        }
      )

  }

  onGetCinema(v: any) {
    this.salles=undefined;
    this.currentVille=v;
    this.cinemaService.getCinema(v)
      .subscribe( data =>{
          this.cinemas=data;
        },err=>{
          console.log(err);
        }
      )

  }

  OnGetSalles(c) {
    this.currentCinema=c
    this.cinemaService.getSalles(c)
      .subscribe( data =>{
          this.salles=data;
          this.salles._embedded.salles.forEach(salle=>{

            this.cinemaService.getProjection(salle)

              .subscribe( data =>{

                salle.projections=data;
              },err=>{
                console.log(err);

              })

          })

        },err=>{
          console.log(err);
        }
      )


  }

  onGetPlace(p) {
    this.currentProjection=p;
    this.cinemaService.getTicketPlace(p)
      .subscribe( data =>{
          this.currentProjection.tickets=data;
          this.selectedTicket=[];
        },err=>{
          console.log(err);
        }
      )

  }

  OnSelectTicket(t) {
    if(!t.selected){
      t.selected=true;
      this.selectedTicket.push(t);
    }
    else{
      t.selected=false;
      this.selectedTicket.splice(this.selectedTicket.indexOf(t),1);
    }
    console.log(this.selectedTicket);


  }

  getTicketClasse(t) {

    let str ="btn margin ";
    if(t.reserve==true){
      str+="btn-danger ";
    }else if(t.selected) {
      str+="btn-warning";
    }else{
      str+="btn-success";
    }
    return str;
    console.log(str);



  }

  onPayeTicket(f) {

    let tickets=[];
    this.selectedTicket.forEach(t=>{
      tickets.push(t.id);
    });
    f.tickets=tickets;
    console.log("f est : "+f);
    this.cinemaService.payerTicket(f)
      .subscribe( data =>{
         alert("Ticket  reservée avec succés !");
        this.onGetPlace(this.currentProjection);
        },err=>{
          console.log(err);
        }
      )

  }
}
