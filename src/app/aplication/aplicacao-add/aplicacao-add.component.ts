import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AplicacaoService } from 'src/app/core/aplicacao.service';
import { Aplicacao, AplicacaoOpcao, ComboBoxResposta } from 'src/app/shared/model/aplicacao';

@Component({
  selector: 'app-aplicacao-add',
  templateUrl: './aplicacao-add.component.html',
  styleUrls: ['./aplicacao-add.component.css']
})
export class AplicacaoAddComponent implements OnInit {

  form!:FormGroup;
  public lista?: AplicacaoOpcao[];
  submitted = false;
  aplicacao:Aplicacao={

    codigoAplicacao:'' ,
    codigoDescricaoRetorno:'' ,
    nomeDescricaoRetorno:'',
    mensagemDescricaoRetorno:''

  }

  constructor(private aplicacaoService:AplicacaoService,private formBuilder: FormBuilder,private router:Router){}

  ngOnInit(): void {
      this.form=this.formBuilder.group({
      codigoAplicacao: ['',Validators.required],
      codigoDescricaoRetorno: ['',Validators.required],
      nomeDescricaoRetorno: ['',Validators.required],
      mensagemDescricaoRetorno: ['']
  })

  this.getComboBox();

};

  saveAplicacao(): void{

    const body=this.form.value;
    console.log(body);

    this.aplicacaoService.create(body)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.voltarParaLista();
      },
      error => {
        console.log(error);
      });

        this.newAplicacao();

  }


  newAplicacao(): void {

    this.submitted = false,
    this.aplicacao = {
    codigoAplicacao:'' ,
    codigoDescricaoRetorno:'' ,
    nomeDescricaoRetorno:'',
    mensagemDescricaoRetorno:'',
  };

  // mostrar no console o processo de resetar o formulario
  console.log(JSON.stringify(this.form.value, null, 2));
}

//popular ComboBox
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

}}











