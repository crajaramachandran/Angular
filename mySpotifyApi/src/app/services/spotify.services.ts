import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    // we declare that this service should be created
    // by the root application injector.
    providedIn: 'root',
  })

export class SpotifyService{
    private client_id ='6d51a8c03be04a05b55ece1480ffdb91';
    private client_secret = '3cdb2d71f50542b4b7178ae02ea7ee99';
    private encoded = btoa(this.client_id + ':' + this.client_secret);
    private searchUrl:string;
    private artistUrl:string;
    private albumsUrl:string;
    private albumUrl:string;


    constructor(private http:HttpClient){

    }

    getToken(){
        var params = ('grant_type=client_credentials');
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + this.encoded
            })
          };
         return this.http.post('https://accounts.spotify.com/api/token', params,httpOptions);
    }

    searchMusic(str:string, type='artist' ,token:string){
      
      this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=50&type='+type;
      let headers = new Headers();

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };

      return this.http.get(this.searchUrl , httpOptions);
      
  }


  getArtist(id:string,token:string){
      
    this.artistUrl = 'https://api.spotify.com/v1/artists/'+id;
    let headers = new Headers();

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get(this.artistUrl , httpOptions);
    
}

  getAlbums(artistId:string,token:string){
      
  this.albumsUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums';
  let headers = new Headers();

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
  };

  return this.http.get(this.albumsUrl , httpOptions);
  
}


getAlbum(id:string,token:string){
      
  this.albumUrl = 'https://api.spotify.com/v1/albums/'+id;
  let headers = new Headers();

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
  };

  return this.http.get(this.albumUrl , httpOptions);
  
}





}
