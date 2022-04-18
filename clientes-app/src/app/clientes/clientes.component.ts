import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private clienteService: ClienteService) { }//Se define el atributo y a su vez de inyecta

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(  //Get cliente es un observable, va a ser observado por observadores, entonces tenemos que subscribirlo
      clientes => this.clientes = clientes  //Pasamos el stream a this.clientes
    );
  }

}
