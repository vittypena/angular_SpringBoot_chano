import { Injectable } from '@angular/core';
//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';     //Otra forma

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes' //Endpoint
  constructor(private http: HttpClient) { }

getClientes(): Observable<Cliente[]>{ //Convertimos nuestro listado de clientes en un Observable, para convertirlo en un stream y poder manejarlo en api rest
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint)
  }
}
