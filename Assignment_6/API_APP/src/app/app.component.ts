/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: EUN KYUNG (AIMEE) LEE Student ID: 056342132 Date: 04-09-2021
*
* Online Link: https://web422-assign6-4gsxap2kw-aimee718.vercel.app/login
*
********************************************************************************/ 

import { User } from './User';
import { AuthService } from './auth.service';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart,Event, Router, RouterLink, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'WEB422-A4';
  getvalue:string="";
  token:any;
  public token_clone:any;
  userName:String;
  searchString:string="";
  constructor(private router: Router,private auth:AuthService,
     private _route: ActivatedRoute){

  }
  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
        this.userName=this.token.userName;
        this.token_clone = this.token;
        console.log("app..readtoken..>"+JSON.stringify(this.token));
      }
    });
  }
  handleSearch():void{
    console.log(this.searchString);   
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString="";
  }

  logout(){
    
    this.token.userName = "";
    this.userName="";
    localStorage.removeItem('access-token');    
    this.router.navigate(['/login']);
  }

}
