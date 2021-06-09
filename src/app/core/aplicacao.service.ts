
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Aplicacao, AplicacaoResposta, ComboBoxResposta, Filter } from '../shared/model/aplicacao';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService {

  private REST_API_SERVER = "http://academia-api-front-w3.app-sistemas-web.online/api";
  private headers:HttpHeaders;
  private params!:HttpParams;
  //adicionando novo formulario e o resetando logo em seguida

  constructor(private httpCliente: HttpClient) {

    this.headers= new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Authorization':'Bearer eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJJVk9ORSIsImF1ZCI6Inlmd05TSFVhRGlXQ1VrRU5CaE9DUEliRWJEQWEiLCJuYmYiOjE2MjI0OTAwMTgsImF6cCI6Inlmd05TSFVhRGlXQ1VrRU5CaE9DUEliRWJEQWEiLCJpc3MiOiJodHRwczpcL1wvYXJjaC1pZGVudGl0eS1zZXJ2ZXItc2VydmljZTozMDExMVwvb2F1dGgyXC90b2tlbiIsImV4cCI6MTYyMjQ5MzYxOCwiaWF0IjoxNjIyNDkwMDE4LCJqdGkiOiI2ZTI3N2M1Zi0yNjhmLTQ0ZWMtODU5Ny0xZThiNzAzODM1MjMifQ.bbjIlFsSNkR1bmWnNlXZtMxxSDwZ8qd40jj9J991khl3jDEqo_1av9iJo0ytcRvhoLZVshpmlC-T_D2jxav0NhgrCPu1KWxR7tTlmAJqC799NVPEbrk8IY69V8XOrkU4wDanVcmOTmJVd2MGSDGbNFYSkklWzKX9MFZ-2w8xjLAPHa__32-Gw3aQmpiOapRCgT74i-qEz4AjNCC0uD95TcL8JAZ4PvCqKeyZOGCJfTviGbZ29l0GNhi6R90ppoOqYG1AIDo7SxNKDjgBiLUTll1sADwsxtVTMDpN16x9MZSi9A7ppYfH_PCzDHmXkMcDC5mp-Ipe_A4j1pcJ4eGJxg'}) }

    //pega toda lista
    public sendGetRequest(){
    return this.httpCliente.get(this.REST_API_SERVER);
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
    return this.httpCliente.get<AplicacaoResposta>(this.REST_API_SERVER + '/parametro/1.0.0/descricoesretornos',options).pipe(retry(3),catchError(this.handleError));
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
    return this.httpCliente.get<ComboBoxResposta>(this.REST_API_SERVER +'/sistema/1.0.0/dominios/1175/conteudos',options).pipe(
      retry(3),catchError(this.handleError));
  }


  public  create(data: any): Observable<any> {
    const options ={headers:this.headers};

    return this.httpCliente.post(this.REST_API_SERVER + '/parametro/1.0.0/descricoesretornos', data, options).pipe(
      retry(3),catchError(this.handleError))
  }

  public update(identificadorDescricaoRetorno: number, data: Aplicacao): Observable<Aplicacao> {
    return this.httpCliente.put<Aplicacao>(this.REST_API_SERVER +'/parametro/1.0.0/descricoesretornos/'+identificadorDescricaoRetorno, data,{headers:this.headers}).pipe(
      retry(3),catchError(this.handleError))

  }

  public recuperarObjeto(indentificadoDescricaoRetorno:number):Observable<Aplicacao>{

    return this.httpCliente.get<Aplicacao>(this.REST_API_SERVER+'/parametro/1.0.0/descricoesretornos/' + indentificadoDescricaoRetorno,{headers:this.headers})
  }

  public delete(identificadorDescricaoRetorno: number): Observable<any> {
    return this.httpCliente.delete(`${this.REST_API_SERVER+'/parametro/1.0.0/descricoesretornos'}/${identificadorDescricaoRetorno}`,{headers:this.headers}).pipe(
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

