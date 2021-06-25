import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results:Array<any>=[];
  searchQuery:any;
  constructor(private _route: ActivatedRoute,private _search:MusicDataService) {
    this.searchQuery= this._route.snapshot.queryParams['q'];
    console.log("search page..."+this.searchQuery);
   }

  ngOnInit(): void {
    this._search.searchArtists(this.searchQuery).subscribe(res=>{
       
       Object.keys(res.artists.items).map(key=>{
         
         this.results.push({
            "name":res.artists.items[key].name,
            "image":res.artists.items[key].images[2].url,
            "followers":res.artists.items[key].followers,
            "popularity":res.artists.items[key].popularity,
            "sid":res.artists.items[key].id
         });// end of push

       })//end of keys
    });//end of search subscribe
  }

}
