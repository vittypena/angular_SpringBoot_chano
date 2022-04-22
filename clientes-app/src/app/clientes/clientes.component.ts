import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];  
  paginador:any;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }//Se define el atributo y a su vez de inyecta

  ngOnInit(): void {     
    this.activatedRoute.paramMap.subscribe( params => {   
      let page:number = +params.get('page')! | 0; //Lo convierte a string y si no hay parametro lo pone en 0 por defecto.
      this.clienteService.getClientes(page).subscribe(  //Get cliente es un observable, va a ser observado por observadores, entonces tenemos que subscribirlo
        response => {
          this.clientes = response.content as Cliente[]  //Pasamos el stream a this.clientes
          this.paginador = response;
        }
      );
    }
    );
  }

  delete(cliente: Cliente): void{
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes= this.clientes.filter(cli => cli!==cliente); //Quitamos el objeto que acabamos de eliminar del arreglo en vez de hacer un get y pillar todos.
            swal.fire(
              'Cliente Eliminado',
              'Cliente ${cliente.nombre} eliminado con éxito.',
              'success'
            )
          }
        )
      }
    })
  }  
  
}
