import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routers : Routes = [  //Routing
  {path : 'about' , component :AboutComponent}, 
  {path : 'newReleases' , component :NewReleasesComponent},
  {path : 'album/:id',component : AlbumComponent},
  {path : 'artist/:id',component : ArtistDiscographyComponent},
  {path : 'favourites',component : FavouritesComponent},
  {path : 'search',component : SearchResultComponent},
  {path : '**', redirectTo : 'newReleases',  pathMatch : 'full'}
]


@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
