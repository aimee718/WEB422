/*********************************************************************************
* WEB422 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: Eun Kyung (Aimee) Lee Student ID: 056342132 Date: 03-26-2021
*
********************************************************************************/
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WEB422-A4';
  getvalue:string="";

  searchString:string="";
  constructor(private router: Router,private _route: ActivatedRoute){
  
  }
  handleSearch():void{
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString="";
  }

}
