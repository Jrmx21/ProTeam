import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/jugador';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  cantidadEquipos: number = 2; //por defecto se crean 2 equipos
  cantidadJugadorPorEquipo = 0;
  jugadores: Jugador[] = [];

  nombreInput: string = '';
  notaInput: number = 0;
  equiposHechos: Jugador[][] = [];
  jugadorSobrante: number = 0;
  sumaTotalNota: number = 0;
  addJugador() {
    this.jugadores.push({ nombre: this.nombreInput, nota: this.notaInput });
    this.nombreInput = '';
  }

  constructor() {}

  borrarJugador(i: Jugador) {
    this.jugadores.splice(this.jugadores.indexOf(i), 1);
  }


  crearEquipos() {
    this.sumaTotalNota = 0;
    if (this.cantidadEquipos >= 2) {
      this.cantidadJugadorPorEquipo = Math.round(
        this.jugadores.length / this.cantidadEquipos
      );
      this.jugadorSobrante = this.jugadores.length % this.cantidadEquipos;
      console.log(this.cantidadJugadorPorEquipo);
      console.log(this.jugadorSobrante);
    }

    for (let i = 0; i < this.jugadores.length; i++) {
      this.sumaTotalNota = this.sumaTotalNota + this.jugadores[i].nota;
    }

    console.log('SUMA TOTAL DE NOTAS = ' + this.sumaTotalNota);

    // Ordenamos los jugadores por nota de mayor a menor
    this.jugadores = this.jugadores.sort((a, b) => b.nota - a.nota);

    // Inicializamos los equipos
    this.equiposHechos = Array.from({ length: this.cantidadEquipos }, () => []);

    // Asignación de jugadores a equipos de forma más eficiente
    for (let i = 0; i < this.jugadores.length; i++) {
      // Encontramos el equipo con la menor suma de notas
      const equipoConMenorSuma = this.equiposHechos.reduce((minEquipo, equipo, index) => {
        const sumaNotasEquipo = equipo.reduce((sum, jugador) => sum + jugador.nota, 0);
        return sumaNotasEquipo < minEquipo.suma ? { indice: index, suma: sumaNotasEquipo } : minEquipo;
      }, { indice: 0, suma: Infinity });

      // Asignamos al jugador al equipo con menor suma
      this.equiposHechos[equipoConMenorSuma.indice].push(this.jugadores[i]);
    }

    console.log(this.equiposHechos);
  }

  ngOnInit() {}
}
