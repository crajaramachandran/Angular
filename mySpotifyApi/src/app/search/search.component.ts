import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.services';
import {Artist} from '../../../Artist';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[SpotifyService]
})
export class SearchComponent implements OnInit {

  constructor(private _service:SpotifyService) { }

  ngOnInit() {
  }

  searchStr : string;
  searchRes : Artist[];
  token:string;
  searchMusic(){
      this._service.getToken().subscribe(res=>{
         let obs = this._service.searchMusic(this.searchStr,'artist',res['access_token']);
         obs.subscribe(retStr=>{
            this.searchRes = retStr['artists']['items'];
         });
      });
  }
  

  

}

