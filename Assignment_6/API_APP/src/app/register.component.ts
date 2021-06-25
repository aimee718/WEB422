import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterUser} from './../RegisterUser'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser ;
  warning:any;
  success:any =false;
  loading:any=false;

  constructor( private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.registerUser = {
      userName: "",
      password: "",
      password2: ""
    };
  }

  onSubmit(f: NgForm):void{
   //console.log("...."+ f.value);
   if(this.registerUser.userName.length>1 
       && this.registerUser.password == this.registerUser.password2 ){
        this.loading = true;
        this.auth.register(this.registerUser)
        .subscribe(
          data=>{
            this.success=true;
            this.warning=null;
            this.loading=false;
         },
         error=>{
            this.success=false;
            this.warning=error;
            this.loading=false;
         });//end of subscribe
   }
   
  }

}
