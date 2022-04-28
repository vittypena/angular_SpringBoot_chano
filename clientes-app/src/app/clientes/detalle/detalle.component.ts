import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente!: Cliente;  

  titulo: string = "Detalle del cliente";
  private progreso: number = 0;

  private fotoSeleccionada!: File;
  constructor(private clienteService: ClienteService, 
    private activatedRoute: ActivatedRoute) { }//ActivatedRoute permite identificar cuando cambia el parametro id.

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{//Subcribir cuando cambia el id para poder obtener el parametro del cliente
      let id: number = +params.get('id')!;//Obtenemos el parametro id
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente => { //obtenemos el objeto cliente con ese id y se lo pasamos a nuestro cliente.
          this.cliente = cliente;
        });
      }
    });
  }

  get fotoSelec(){
    return this.fotoSeleccionada;
  }

  seleccionarFoto(event: any){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){    //Busca coincidencia con image
      swal.fire('Error seleccionar imagen: ' , 'Error: el archivo debe de ser del tipo imagen' , 'error');
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal.fire('Error Upload: ', 'Error: debe seleccionar una foto', 'error');
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente?.id)
      .subscribe(cliente => {
        // if(event.type === HttpEventType.UploadProgress){
        //   this.progreso = 
        // }
        //this.cliente = cliente;
        swal.fire('La foto se ha subido completamente', `La foto se ha subido: ${this.cliente.foto}`, 'success');
      });
    }    
  }
}
