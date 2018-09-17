import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.services';
import { Album } from '../../../Album';
import { Artist } from '../../../Artist';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  id : String;
  artist: Artist;
  albums : Album[];
  constructor(private _service:SpotifyService,
              private _route:ActivatedRoute) { }

  ngOnInit() {
    let obs = this._service.getToken();
    obs.subscribe(token =>{
        this._route.params.subscribe(paramID=>{
          this._service.getArtist(paramID['id'],token['access_token']).subscribe(artist=>{
            this.artist = artist as Artist;  
            //console.log(this.artist);
          })

          this._service.getAlbums(paramID['id'],token['access_token']).subscribe(albums=>{
            this.albums = albums['items'] as Album[];  
            console.log(this.albums);
          })

        })
    });
    
  }

}
