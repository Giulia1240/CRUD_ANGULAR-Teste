import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AplicacaoAddComponent } from './aplication/aplicacao-add/aplicacao-add.component';
import { AplicacaoDeleteComponent } from './aplication/aplicacao-delete/aplicacao-delete.component';
import { AplicacaoListComponent } from './aplication/aplicacao-list/aplicacao-list.component';
import { AplicacaoUpdateComponent } from './aplication/aplicacao-update/aplicacao-update.component';


const routes: Routes = [{ path: '', redirectTo: 'aplicacao', pathMatch: 'full'},
{path: 'aplicacao-add', component: AplicacaoAddComponent },
{path: 'aplicacao-update/:id', component: AplicacaoUpdateComponent},
{path: 'aplicacao-delete/:id', component: AplicacaoDeleteComponent},
{path: 'aplicacao', component: AplicacaoListComponent }
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
