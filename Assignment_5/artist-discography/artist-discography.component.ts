import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  id:string;
  
  public artist_info:Artist[]=[];
  public artists_full:Array<any>=[];
  constructor(private _route: ActivatedRoute,private _artist:MusicDataService){ 
    this.id = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._artist.getArtistById(this.id).subscribe(res=>{
       //console.log(JSON.stringify(res));
       this.artist_info.push({
         name:res.name,
         image:res.images[0].url
       });
      
    })

    this._artist.getAlbumsByArtistId(this.id).subscribe(res=>{
        Object.keys(res.items).map(key => {
        //console.log("name.."+JSON.stringify(res.items[key].name));
        this.artists_full.push(
          {"name":res.items[key].name,
           "image":res.items[key].images[1],
           "release_date":res.items[key].release_date,
           "total_tracks":res.items[key].total_tracks,
           "album_id":res.items[key].id
          });
      })
    }); //end of getalbumbyartistid
  }

}
export interface Artist{
  name:string;
  image:string;
}
