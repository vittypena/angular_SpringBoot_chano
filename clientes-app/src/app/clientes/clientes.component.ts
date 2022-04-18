import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];  

  constructor(private clienteService: ClienteService) { }//Se define el atributo y a su vez de inyecta

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(  //Get cliente es un observable, va a ser observado por observadores, entonces tenemos que subscribirlo
      response => this.clientes = response  //Pasamos el stream a this.clientes
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
