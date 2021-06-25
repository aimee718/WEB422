import { Component, OnInit, ViewChild } from '@angular/core';
import { MatList, MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  track_favourites:Array<any>=[];
  track_artist_name:Array<any>=[];
  public str_name:string="";
  i:number=0;


  constructor(private _route: ActivatedRoute,private snackbar:MatSnackBar,private _albums:MusicDataService) {

   }
  

  ngOnInit(): void {
    this.makeFavourite();
  }
  makeFavourite(){
    //if(this._albums.favouritesList.length !=0){
        this._albums.getFavourites().subscribe(res=>{
          let len = Object.keys(res.tracks[0].artists).length;
          
          Object.keys(res.tracks[0].artists).map(key => { 
            for(var i=0; i< len; i++) this.str_name+=res.tracks[0].artists[i].name; 
            console.log("strname..."+this.str_name);

          })
          
          Object.keys(res.tracks).map(key => {  
            this.track_favourites.push(
              {
              "name":res.tracks[key].name,
              "duration_ms":res.tracks[key].duration_ms,
              "artist_name":res.tracks[key].artists[0].name,  
              "preview_url":res.tracks[key].preview_url,
              "trackID":res.tracks[key].id,
              "album_name":res.tracks[key].album.name,
              "album_id":res.tracks[key].album.id,
              "artist_id":res.tracks[key].album.artists[0].id
              
              });
              
          })
         
        });//end of getfavourites
     //}
  }

  removeFav(trackid:any,obj:any){
    console.log("at..favo.ts.."+trackid);
    this._albums.removeFromFavourites(trackid); 

    this.track_favourites = this.track_favourites.filter(item => item !== obj);
  }

}
