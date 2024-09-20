import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { PlayerInterface } from '../../_interface/player.interface';
import { PlayerService } from '../../_service/player/player.service';
import {AppComponent} from "../../app.component";
import {ApiReponseInterface} from "../../_interface/api-reponse.interface";
import {CapeInterface} from "../../_interface/player-interface/cape.interface";
import {SkinplayerComponent} from "../skinplayer/skinplayer.component";
import {CapeService} from "../../_service/cape/cape.service";

@Component({
  selector: 'app-infoplayer',
  standalone: true,
  imports: [
    RouterLink,
    SkinplayerComponent
  ],
  templateUrl: './infoplayer.component.html',
  styleUrl: './infoplayer.component.css'
})
export class InfoplayerComponent implements OnInit {

  private playerService: PlayerService = inject(PlayerService);

  pseudoPlayer:string = "";
  player: PlayerInterface | any;

  isMobile:boolean = false;

  dbCapeId:number|undefined;

  constructor(private route:ActivatedRoute,
              protected app:AppComponent,
              private capeService: CapeService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pseudoPlayer = params['pseudo'];
      this.dbCapeId = undefined;
      this.getPlayerOne();
      this.capeSelected();
    });
    this.getPlayerOne();
    this.capeSelected();

    this.isMobileScreen();
    window.addEventListener('resize', () => {
      this.isMobileScreen();
    });
  }

  getPlayerOne(){

    this.playerService.getPlayer(this.pseudoPlayer, this.app.setURL()).subscribe((reponsePlayer:ApiReponseInterface) => {
      this.player = reponsePlayer.data;
      // console.log(this.player);
    });

  }

  openPlayerProfile() {
    const url = `https://fr.namemc.com/profile/${this.player.player.pseudo}`;
    window.open(url, '_blank');
  }

  isMobileScreen() {
    this.isMobile = window.innerWidth < 1300;
  }

  capeSelected(){
    this.capeService.getCapeByPseudo(this.app.setURLUseritium(), this.pseudoPlayer).subscribe( (reponse:ApiReponseInterface) => {
      if (reponse.status == "true" && reponse.result){
        let idCapeSelected: { cape: string } = reponse.result as { cape: string };
        if (idCapeSelected.cape != null && idCapeSelected.cape != "null"){
          this.dbCapeId = Number(idCapeSelected.cape);
        }
      }
    });
  }

}
