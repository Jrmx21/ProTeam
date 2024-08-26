import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/jugador';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  cantidadEquipos: number = 2; //por defecto se crean 2 equipos

  jugadores: Jugador[] = [];

  nombreInput: string = '';
  notaInput: number = 0;
equiposHechos: Jugador[][] = [];
  addJugador() {
    this.jugadores.push({ nombre: this.nombreInput, nota: this.notaInput });
    this.nombreInput = '';
  }

  constructor() {}

  borrarJugador(i: Jugador) {
    this.jugadores.splice(this.jugadores.indexOf(i), 1);
  }

  crearEquipos() {
    let equipos: Jugador[][] = [];
    for (let i = 0; i < this.cantidadEquipos; i++) {
      equipos.push([]);
    }

    this.jugadores = this.jugadores.sort((a, b) => a.nota - b.nota);

    for (let i = 0; i < this.jugadores.length; i++) {
      equipos[i % this.cantidadEquipos].push(this.jugadores[i]);
    }
    this.equiposHechos=equipos;
    console.log(this.equiposHechos);
  }

  ngOnInit() {}
}
