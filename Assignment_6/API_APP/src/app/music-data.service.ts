import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  favouritesList:Array<any>=[] ;
  favouritesArray:UserFav;
  favouritesGet:Array<any>=[] ;

  token1:string="Bearer BQC7h1YgUYapa2pDxt14CQS8c16W0-aBPBtZH9mTryv33y41ofq2FmQfXUDWwZ_Z2zMcstsAvvXicoeLstEMgVYBeArS4klgmCVA8cYfEBlGd8zplPYDSgardsCxa7GozyRX4xCQSLj-kt_VfWjrqUHYo3dsBK4";
  
  token2:string="Bearer BQBy294b-qxUXi4lcMVBVFl7Qjw-2Lbpctq4kDJ523G4AKZHTvtC2nz2S822qDkaNHJX3O5m8B7X_3RxG8_2w2Jx_XS9JRUR-rVVFGC69Ns2-1rl80J2fA67WGfAyirBBA8_RTJeWIY0bG9hJ7jMhZIHuRkVY0U";
  
  token3:string="Bearer BQBcChNLqmvs-UzmNrdT9EgSNKWOnIU6dPKm0abNdETJcmqGR40_JZ49tcJN_ROepCf-fdvgwNgLIwNKTfVuOz7cXi08ErFt7WPANZX1xU7dYBliHPzFHW5vR9R2Wx5iI7N_BOUBF_DcHpiqlazl8GNiILH24c0";
  
  token4:string="Bearer BQD5IiZhfEZm7JzjzI51oZOfyphn8EKvmWUYjKJE8X4UALJFRs1HStZCd15-ZkSdkJXdb_qCBkbRY2BBXeNEEh8KuCZlG0nu9-HpGWA9njgI-gxdjbVsXwsMAPMkgCNDPLQksxAUc6_lx2Oe7N60BA90xP7R5DM";
  
  token5:string="Bearer BQAWLtynhGIuDa2UQnG_iH74TtbIfBmwZwXnWA2c5tYVtCo2JSiD3ZlDDOGLECn8Ok-mmnJEKpkjgoGrundcS3fWy5u0iQ8iXe0bATxWVvZN0CyEIbT-frHVPJeI-pD2xaqoCVpzhG0";
  
  token6:string="Bearer BQD8IypPpOALiFpIfa4fpEOmvaaQ26vG0I77okQ9vbm8eaJEb2aaf2nBNCsrktGg7DEdbpsqaUQ4x_8jki8_-kg6IrsiVB4VQzlJBq1mpLMxt_kuHQZp5Gqbt9-P6ozNeuNy7RAKt_qaAK7jEZuYpBruzrImxEI";
  
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient,private _auth:AuthService) { }  
 //--token1
  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `${this.token1}`}});
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

  addToFavourites(trackid:any): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    var readtoken = this._auth.readToken();
    var gettoken = this._auth.getToken();
    

    this.favouritesArray= {
      "id": `${readtoken._id}`,
      "favourites": `${trackid}`
    };
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `JWT ${gettoken}`
      })
    };
    return this.http.put<any>(`${environment.userAPIBase}/favourites/${readtoken._id}`
      ,this.favouritesArray,httpOptions);
  }
  addToFavourites_org(trackid:any): boolean {
    console.log(`${environment.userAPIBase}/favourites/${trackid}`);
    
    var len = this.favouritesList.length;
    this.favouritesList.push(trackid);
    console.log(this.favouritesList);
    if (len==0 || this.favouritesList == undefined || len>50){
      return false;
    }else{
      return true;
    }   
  }
  //----------------------------------------------
  removeFromFavourites(trackid:any): Observable<any> {
    var readtoken = this._auth.readToken();
    var gettoken = this._auth.getToken();

    this.favouritesArray= {
      "id": `${readtoken._id}`,
      "favourites": `${trackid}`
    };
    let httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `JWT ${gettoken}`
      })
    };
    var pass_id = this.favouritesArray.favourites;
    this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${pass_id}`,httpOptions2)
          .subscribe((data)=>{
            console.log("success");
      });
    return this.getFavourites();
  }
  
  removeFromFavourites_org(trackid:any) {
    this.favouritesList.forEach((element,index)=>{
      if(element==trackid) this.favouritesList.splice(index,1);
      return this.favouritesList;
    });
    return this.getFavourites();
  }
  //-------------------------------------------------
  //--token6
  
  getFavourites(): Observable<any> {
    var readtoken = this._auth.readToken();
    
 
     var readtoken = this._auth.readToken();
     var gettoken = this._auth.getToken();
     let httpOptions3 = {
       headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'Authorization': `JWT ${gettoken}`
       })
     };
     this.http.get<[String]>(`${environment.userAPIBase}/favourites/`,httpOptions3)
         .subscribe((data)=>{
           this.favouritesGet=data;
          console.log("success");
        });

    let len = this.favouritesList.length;
    if(len > 0){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesGet.join(',')}`, { headers: { "Authorization": `${this.token6}` } });
      }));
    }else{
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesGet.join(',')}`, { headers: { "Authorization": `${this.token6}` } });
      }));
    }
  }
  getFavourites_org(): Observable<any>  {
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
 //--------------------------------------------------
 
}// end of class
export interface UserFav {
  id: string;
  favourites:string;
}
export interface Fav{
  favourites:Array<string>;
}
