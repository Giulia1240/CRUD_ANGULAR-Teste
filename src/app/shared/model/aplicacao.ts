export interface Aplicacao {

identificadorDescricaoRetorno?: number;
codigoAplicacao: string;
codigoDescricaoRetorno: string;
nomeDescricaoRetorno: string;
mensagemDescricaoRetorno?: string;

}

export interface AplicacaoResposta{

    page:number;
    perPage:number;
    totalPages:number;
    totalElements:number;
    descricoesretorno:Aplicacao[];

}


export interface AplicacaoOpcao{

    idDominio:number;
    idDominioConteudo:number;
    codigoDominioConteudo: string;
    descricaoDominioConteudo: string;
    ordem:number;
    flagAtivo:string;
}

export interface ComboBoxResposta
{
    page:number,
    perPage:number,
    totalPages:number,
    dominiosconteudos:AplicacaoOpcao[];
}

export interface Filter{
    codigoAplicacao?: string|any;
    codigoDescricaoRetorno?: string| any;
    nomeDescricaoRetorno?: string|any;
}


