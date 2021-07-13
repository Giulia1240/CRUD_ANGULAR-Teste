import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AplicacaoService } from 'src/app/core/aplicacao.service';
import { AplicationService } from 'src/app/coree/aplication.service';
import {
  Aplicacao,
  AplicacaoOpcao,
  ComboBoxResposta,
  Filter,
} from 'src/app/shared/model/aplicacao';

@Component({
  selector: 'app-aplicacao-list',
  templateUrl: './aplicacao-list.component.html',
  styleUrls: ['./aplicacao-list.component.css'],
})
export class AplicacaoListComponent implements OnInit {

  public filtroform!: FormGroup;
  public aplicacoes?: Aplicacao[];
  public lista?: AplicacaoOpcao[];
  public totalItems:number=300;
  public perPage!:number;


  constructor(
    private aplicacaoService: AplicationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.preencherLista(1, {});

    this.filtroform= this.formBuilder.group({
      codigoAplicacao: '',
      codigoDescricaoRetorno: '',
      nomeDescricaoRetorno: '',

    });

    this.getComboBox();
  }

  //preenchendo lista e fazendo filtro
  public preencherLista(page: number, filter: Filter) {
    this.aplicacaoService.getAplicacao(page, filter).subscribe({
        next: (data) => {

        this.aplicacoes = data.descricoesretorno;
        this.totalItems= data.totalElements;
        this.perPage=data.perPage;

        console.log(data);
      },
      error: (erro) => console.log(erro),
    });
  }

  aplicarFiltro(){
    this.preencherLista(1, this.filtroform.value);
  }

  //popular ComboBox
  private getComboBox(): void {
    this.aplicacaoService.getComboBox(1).subscribe((comboBoxOptions: ComboBoxResposta) => {

        console.log(comboBoxOptions.dominiosconteudos);

        this.lista = comboBoxOptions.dominiosconteudos;

      });
  }

  //mudar pagina
  public pageChanged(event: any){
    return this.preencherLista(event.page, this.filtroform.value)}


  //mudarTela
  public mudarTela(): void {
    this.router.navigateByUrl('/aplicacao');
  }




}
