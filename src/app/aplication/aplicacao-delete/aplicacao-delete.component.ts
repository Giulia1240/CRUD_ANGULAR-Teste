import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacaoService } from 'src/app/core/aplicacao.service';
import { AplicationService } from 'src/app/coree/aplication.service';
import { Aplicacao } from 'src/app/shared/model/aplicacao';

@Component({
  selector: 'app-aplicacao-delete',
  templateUrl: './aplicacao-delete.component.html',
  styleUrls: ['./aplicacao-delete.component.css']
})
export class AplicacaoDeleteComponent implements OnInit {

  public form!:FormGroup;
  submitted = false;
  aplicacao:Aplicacao={

    codigoAplicacao:'' ,
    codigoDescricaoRetorno:'' ,
    nomeDescricaoRetorno:'',
    mensagemDescricaoRetorno:'',

  }

    //actived router é utilizado para rota dentro da mesma janela
    constructor(private aplicacaoService:AplicationService,private formBuilder:FormBuilder, private activatedRouter:ActivatedRoute, private router:Router){}

    ngOnInit(): void {

      this.form=this.formBuilder.group({
        codigoAplicacao: ['',Validators.required],
        codigoDescricaoRetorno: ['',Validators.required],
        nomeDescricaoRetorno: ['',Validators.required],
        mensagemDescricaoRetorno: ['']
    })

    this.recuperarDB();

    }

    public recuperarDB():void{

      this.aplicacaoService.recuperarObjeto(this.activatedRouter.snapshot.params['id']).subscribe((item:Aplicacao)=>{

      this.form.patchValue({
        codigoAplicacao: item.codigoAplicacao,
        codigoDescricaoRetorno: item.codigoDescricaoRetorno,
        nomeDescricaoRetorno: item.nomeDescricaoRetorno,
        identificadorDescricaoRetorno: item.identificadorDescricaoRetorno,
        mensagemDescricaoRetorno: item.mensagemDescricaoRetorno
        });
      });
      }

     public deleteAplicacao(): void{

      this.aplicacaoService.delete(this.activatedRouter.snapshot.params['id']).subscribe(

      response => {
        console.log(response);
        this.submitted = true;
        this.mudarTela();
      },
      error => {
        console.log(error);
      }
      );
  }
    public mudarTela(): void {
      this.router.navigateByUrl('/aplicacao');
  }




    }

