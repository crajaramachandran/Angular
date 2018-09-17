import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.services';
import { Album } from '../../../Album';
import { Artist } from '../../../Artist';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id : String;
  album : Album;
  constructor(private _service:SpotifyService,
              private _route:ActivatedRoute) { }


              ngOnInit() {
                let obs = this._service.getToken();
                obs.subscribe(token =>{
                    this._route.params.subscribe(paramID=>{
                      this._service.getAlbum(paramID['id'],token['access_token']).subscribe(album=>{
                        this.album = album as Album;  
                        console.log(this.album);
                      })
            
            
                    })
                });
                
              }

}
