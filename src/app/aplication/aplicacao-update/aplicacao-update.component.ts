import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacaoService } from 'src/app/core/aplicacao.service';
import { AplicationService } from 'src/app/coree/aplication.service';
import { Aplicacao, AplicacaoOpcao, ComboBoxResposta } from 'src/app/shared/model/aplicacao';

@Component({
  selector: 'app-aplicacao-update',
  templateUrl: './aplicacao-update.component.html',
  styleUrls: ['./aplicacao-update.component.css']
})

export class AplicacaoUpdateComponent implements OnInit {

  public form!:FormGroup;
  submitted = false;
  public lista?: AplicacaoOpcao[];
  aplicacao:Aplicacao={
    codigoAplicacao:'' ,
    codigoDescricaoRetorno:'' ,
    nomeDescricaoRetorno:'',
    mensagemDescricaoRetorno:'',
    }

    //actived router é utilizado para rota dentro da mesma janela
    constructor(private aplicacaoService:AplicationService,private formBuilder: FormBuilder, private activatedRouter:ActivatedRoute,private router:Router){}

    ngOnInit(): void {

       this.form=this.formBuilder.group({
        codigoAplicacao: ['',Validators.required],
        codigoDescricaoRetorno: ['',Validators.required],
        nomeDescricaoRetorno: ['',Validators.required],
        mensagemDescricaoRetorno: ['']
    })
    this.getComboBox();

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

  public updateAplicacao(): void{

    let identificador=this.activatedRouter.snapshot.params['id'];
    console.log(identificador);

    const body=this.form.value;
    const payload:Aplicacao={
      ...body,identificadorDescricaoRetorno:identificador
    };

     console.log(payload);

     this.aplicacaoService.update(identificador, payload).subscribe(

      response => {
        console.log(response);
        this.submitted = true;
        this.voltarParaLista();
      },

      error => {
        console.log(error);
      })
    }

    private getComboBox(): void {
      this.aplicacaoService
        .getComboBox(1)
        .subscribe((comboBoxOptions: ComboBoxResposta) => {

          console.log(comboBoxOptions.dominiosconteudos);

          this.lista = comboBoxOptions.dominiosconteudos;

        });
    }

    public voltarParaLista(): void {
      this.router.navigateByUrl('/aplicacao');

    }

}








