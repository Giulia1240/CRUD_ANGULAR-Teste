import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AplicacaoAddComponent } from './aplication/aplicacao-add/aplicacao-add.component';
import { AplicacaoListComponent } from './aplication/aplicacao-list/aplicacao-list.component';

import { CamposComponent } from './shared/component/campos/campos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AplicacaoUpdateComponent } from './aplication/aplicacao-update/aplicacao-update.component';
import { AplicacaoDeleteComponent } from './aplication/aplicacao-delete/aplicacao-delete.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    AplicacaoAddComponent,
    AplicacaoListComponent,
    CamposComponent,
    AplicacaoUpdateComponent,
    AplicacaoDeleteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    MatCardModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
