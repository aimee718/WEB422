import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  favouritesList:Array<any>=[] ;
  //---https://api.spotify.com/v1/browse/new-releases
  token1:string="Bearer BQDipzXsOp1ngaxUNPc75GLDLbbc5bCvY71GXuTdB_b3LG57zLOZRuHqe8sqxAE5DE9aikE9O9wrDFuEGe_Vu2fmP5xLeGKuaVcLotuw73QKjyFi3-cMNJ5dLGEY_x_zDUBUyiIa27a5DRig14l008n4e44o6Jk7yl0";
  //---https://api.spotify.com/v1/artists/${id}
  token2:string="Bearer BQD4JUIftX20u4RSZ6_9hcQCv-QYOKcTO7vq8aDD02ZsXyoy9Zzy8DAlkRQtDYq15bUZHJzO7hdIf6XnyzA1iHgAtpDYKu62viLql0T5Dci-bVLfJWi7wNdYuGORyFQE30QjMi7ixMYd8jLpYm5KJ0a7VOsJjtvOG1A";
  //--https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50
  token3:string="Bearer BQD08kSbnJvQKWPidLgoxnuVzmKUkdpIEcgKFNb4umixqmvDT5KZuYGBL9J1WvLAO6ZXTmCpTe2nPuBe8BziNShQJp3d8VaeFEek6Ft_lRDNkeWzDGFAWmxmlEPUm6QJC4voFaPeIJMACKF1lof3_ZBDkLuNXrkhyZk";
  //----https://api.spotify.com/v1/albums/${id}
  token4:string="Bearer BQCJCcUIXl3zpjCBhyl5tWHZpraYSEYoEE2iWZcwUS_ugQEGx3CHHrE15g37UFPVimq99YT1BbuEuUvomhIPBjCFdFwqZw0Jk4zq9uzmBS29PklBoB6TKt3gs_9p_g9rQ4AyoBSDvGyZeYS_lZHzeC2RtxZq0oQMNKo";
  //---https://api.spotify.com/v1/search?q=${searchString}&&type=track,artist
  token5:string="Bearer BQAi_0gvvS1mpOs1boMqzydRC0JhLt-_TYK6FiyDg6BfylwV8bxHn7gH2SOYHbmG6sYfE8WPx8NTjhjl9m8O3egTyigIqerfsXZQnSjXNOkoQSVasy5dpuh6L63qA02sTwcEZcwjLe9TvtxjT7oc1CcWoOe_HU7GxC0";
  //---https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join(',')}
  token6:string="Bearer BQAwx2kTz76Q7P381dtppPWflGVcLWVNnOeidtVOyNoT8dLQyTsRj86Ed4e-W189um0005tM7T9ERe8IPExOc54SzSt9ew1GGld3z2-aNJv6fZGsEmktAUx77a29_k4nB1LqR1u2QC4-qUuxeCs3j1EEBTJGCi_wfpQ";

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `${this.token1}` } });
      }));
  }

  //--token2
  getArtistById(id:any) : Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `${this.token2}` } });
    }));  
  }
//--token3
  getAlbumsByArtistId(id:any) : Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `${this.token3}` } });
    }));
  } 
////--token4
  getAlbumById(id:any) : Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `${this.token4}` } });
    }));  
  }

//--token5
  searchArtists(searchString:any):Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `${this.token5}` } });
    }));
  } 

  addToFavourites(trackid:any):boolean{
    
    var len = this.favouritesList.length;
    this.favouritesList.push(trackid);
    if (len==0 || this.favouritesList == undefined || len>50){
         return false;
    }else{
         return true;
    }    
  } 

  removeFromFavourites(trackid:any) {
    this.favouritesList.forEach((element,index)=>{
      if(element==trackid) this.favouritesList.splice(index,1);
      return this.favouritesList;
    });
    return this.getFavourites();
  }
  //--token6
  getFavourites(): Observable<any>  {
    let len = this.favouritesList.length;
    if(len > 0){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join(',')}`, { headers: { "Authorization": `${this.token6}` } });
      }));
    }else{
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join(',')}`, { headers: { "Authorization": `${this.token6}` } });
      }));
    }
  }
}