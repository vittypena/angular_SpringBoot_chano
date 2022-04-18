import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  /**
   * create
   */
  create() : void{
    this.clienteService.create(this.cliente).subscribe(  
    response => {
    this.router.navigate(['/clientes'])
    swal.fire('Nuevo Cliente', `Cliente ${response.nombre} creado con éxito!`, 'success')
    }
  );
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente
        )
      }
    })
  }

  update() : void{    
      this.clienteService.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente ', `${response.id} editado con éxito!`, 'success')
      }
    );
  }
}
