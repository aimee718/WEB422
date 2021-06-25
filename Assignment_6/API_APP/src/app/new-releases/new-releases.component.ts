import { MusicDataService } from './../music-data.service';
import { Component, OnInit } from '@angular/core';
import { SpotifyTokenService } from '../spotify-token.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  releases: Array<any>=[] ;
  constructor(private albumdata:MusicDataService) {
    albumdata.getNewReleases().subscribe((data)=>{
     this.releases=data.albums.items;
    });
  }
  ngOnInit(): void {
    
  }

}
