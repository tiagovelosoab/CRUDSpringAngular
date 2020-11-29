import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Atendimento } from './atendimento';


@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  private resource='api/atendimento';
  api=environment.urlBase+'/'+this.resource;

  constructor(private httpClient:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAtendimentos(): Observable<Atendimento[]> {
    return this.httpClient.get<Atendimento[]>(this.api)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getAtendimentoByID(valor:number): Observable<Atendimento> {
    return this.httpClient.get<Atendimento>(this.api+'/'+valor)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  saveAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    console.log( JSON.stringify(atendimento));
    return this.httpClient.post<Atendimento>(this.api, JSON.stringify(atendimento), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  updateAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return this.httpClient.put<Atendimento>(this.api, JSON.stringify(atendimento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteAtendimento(atendimento: Atendimento) {
    return this.httpClient.delete<Atendimento>(this.api + '/' + atendimento.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      console.log(errorMessage, 'Client Error');
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      console.log(errorMessage, 'Server Error');
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
