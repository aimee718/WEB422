import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User;
  public warning:any; 
  public loading:any=false;
  public arr_fav:Array<any>=[];
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {   
    this.user = {
      _id:null,
      userName: "",
      password: "",
      fullName:"",
      role:"",
      favourites:null
    };
  }

  onSubmit(f: NgForm): void {
    if(this.user.userName.length>1 && this.user.password.length>1){
      this.loading=true;
      this.auth.login(this.user).subscribe(
        (success)=>{
          this.loading=false;
          localStorage.setItem('access_token',success.token);
          this.router.navigate(['/newReleases']);
        },
        (error)=>{
          this.warning = error.message;
        }
        
      );//end of subscribe

    }// end of if

  }
}
