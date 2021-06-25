import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
//import { DriverComponent } from './driver/driver.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { GuardAuthService } from './guard-auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routers : Routes = [  //Routing
  {path : 'about' , component :AboutComponent,canActivate: [GuardAuthService]}, 
  {path : 'newReleases' , component :NewReleasesComponent,canActivate: [GuardAuthService]},
  {path : 'album/:id',component : AlbumComponent,canActivate: [GuardAuthService]},
  {path : 'artist/:id',component : ArtistDiscographyComponent,canActivate: [GuardAuthService]},
  {path : 'search',component : SearchResultComponent,canActivate: [GuardAuthService]},
  {path : 'favourites',component : FavouritesComponent,canActivate: [GuardAuthService]},
  //{path : 'driver',component : DriverComponent},
  {path : 'home', component: HomeComponent },
  {path : 'login', component: LoginComponent },
  {path : 'register', component: RegisterComponent },
  {path : '', redirectTo: '/login', pathMatch: 'full' },
  {path : '**', component: NotFoundComponent }
  
]

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
