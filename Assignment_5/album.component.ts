import { mergeMap } from 'rxjs/operators';
import { Component, OnInit,Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  
  id:string;
  public aid:string;
  data99:Array<any>=[];
  data77:string;
  public data88:Album[]=[];
  public tr_items:Array<any>=[];
  //album: any = (data as any).default;


  constructor(private _route: ActivatedRoute,private snackBar:MatSnackBar
    ,private _albums:MusicDataService){ 
    this.id = this._route.snapshot.params['id'];
   }
  
 
  ngOnInit(): void {
    this._albums.getAlbumById(this.id)
            .subscribe(res=>{
            this.data99 =res.name;
            this.data77 =res.images[1].url; 
           
              this.data88.push(
                {
                  name:res.name,
                  image:res.images[1].url,
                  label:res.label,
                  release_date:res.release_date,
                  total_tracks:res.total_tracks,
                  popularity:res.popularity,
                  artistname:res.tracks.items[0].artists[0].name,
                  copyrights:res.copyrights[0].text,
                  art_id:res.artists[0].id                
                }
              );
              
               Object.keys(res.tracks.items).map(key => {
                this.tr_items.push(
                  {"track_no":res.tracks.items[key].track_number,
                   "track_name":res.tracks.items[key].name,
                   "duration_ms":res.tracks.items[key].duration_ms,
                   "trackID":res.tracks.items[key].id,
                   "preview_url":res.tracks.items[key].preview_url
                  });
              })
              
    })//end of subscribe
   
    this._albums.getNewReleases().subscribe(res2=>{
      Object.keys(res2.albums.items).map(key => {
        if(res2.albums.items[key].id == this.id)
        //console.log("id--->"+res2.albums.items[key].artists[0].id);
        this.aid = res2.albums.items[key].artists[0].id;
      })
    })
    
  }//end of ngOnInt

  addFav(trackid:any){
    this._albums.addToFavourites(trackid)
    this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 }); 
    console.log(this._albums.favouritesList);
  }

}
export interface Album {
  name: string; 
  image: string; 
  label: string;
  release_date:string;
  total_tracks:number;
  popularity:number;
  artistname:string;
  copyrights:string;
  art_id:string;
 // track_no:number;
 // track_name:string;
 // duration_ms:number;
}

