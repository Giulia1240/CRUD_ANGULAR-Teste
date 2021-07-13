
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Aplicacao, AplicacaoResposta, ComboBoxResposta, Filter } from '../shared/model/aplicacao';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AplicationService {

  private REST_API_SERVER = "https://app-front-week3-api.herokuapp.com/";
  private headers!:HttpHeaders;
  private params!:HttpParams;
  //adicionando novo formulario e o resetando logo em seguida

  constructor(private httpCliente: HttpClient) {

  }

  //paginação
  public getAplicacao(page:number, filter:Filter):Observable<AplicacaoResposta>{
    const options={
      headers:this.headers,
      params:new HttpParams({
        fromObject:{
          per_page:'20',
          page: page.toString(),
          ...filter

        }

      })

    }
    return this.httpCliente.get<AplicacaoResposta>(this.REST_API_SERVER ,options).pipe(retry(3),catchError(this.handleError));
  }
   //popular comboBox
  public getComboBox( page: number):Observable<ComboBoxResposta>{
    const options={
      headers:this.headers,
      params:new HttpParams({
        fromObject:{
          per_page:'20',
          page: page.toString(),

        }
    })}
    return this.httpCliente.get<ComboBoxResposta>(this.REST_API_SERVER,options).pipe(
      retry(3),catchError(this.handleError));
  }


  public  create(data: any): Observable<any> {
    const options ={headers:this.headers};

    return this.httpCliente.post(this.REST_API_SERVER , data, options).pipe(
      retry(3),catchError(this.handleError))
  }

  public update(identificadorDescricaoRetorno: number, data: Aplicacao): Observable<Aplicacao> {
    return this.httpCliente.put<Aplicacao>(this.REST_API_SERVER +identificadorDescricaoRetorno, data,{headers:this.headers}).pipe(
      retry(3),catchError(this.handleError))

  }

  public recuperarObjeto(indentificadoDescricaoRetorno:number):Observable<Aplicacao>{

    return this.httpCliente.get<Aplicacao>(this.REST_API_SERVER + indentificadoDescricaoRetorno,{headers:this.headers})
  }

  public delete(identificadorDescricaoRetorno: number): Observable<any> {
    return this.httpCliente.delete(`${this.REST_API_SERVER}/${identificadorDescricaoRetorno}`,{headers:this.headers}).pipe(
      retry(3),catchError(this.handleError))
  }

  // tratamento de erros
  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };



}

