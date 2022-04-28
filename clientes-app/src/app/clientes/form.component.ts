import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  regiones?: Region[];
  public titulo: string = "Crear Cliente";

  public errores?: string[]; 

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones()
      .subscribe(param => this.regiones = param);
  }

  /**
   * create
   */
  create() : void{
    this.clienteService.create(this.cliente).subscribe(  
    response => {
    this.router.navigate(['/clientes'])
    swal.fire('Nuevo Cliente', `El cliente: ${response.nombre} ha sido creado con exito`, 'success')
    },
    err=> {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status)
      console.error(err.error.errors);
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
        swal.fire('Cliente ', `${response.mensaje}: ${response.cliente.nombre}`, 'success')
      }
    );
  }

  compararRegion(o1: Region, o2:Region):boolean{
    if(o1 === undefined || o2 === undefined){
      return true;
    }
    
    return o1==null ||o2 == null? false: o1.id === o2.id;    
  }
}
