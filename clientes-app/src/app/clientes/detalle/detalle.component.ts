import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente?: Cliente;

  titulo: string = "Detalle del cliente";

  constructor(private clienteService: ClienteService, private activatedRote: ActivatedRoute) { }//ActivatedRoute permite identificar cuando cambia el parametro id.

  ngOnInit(): void {
    this.activatedRote.paramMap.subscribe(params =>{//Subcribir cuando cambia el id para poder obtener el parametro del cliente
      let id: number = +params.get('id')!;//Obtenemos el parametro id
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente => { //obtenemos el objeto cliente con ese id y se lo pasamos a nuestro cliente.
          this.cliente = cliente;
        })
      }
    }
    );
  }

}
