import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ContactCreateComponent } from './contact/contact-create/contact-create.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactDetailsComponent } from './contact/contact-details/contact-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  {
    path: 'contacts',
    children: [
      {
        path: '',
        component: ContactDetailsComponent,
      },
      {
        path: 'create',
        component: ContactCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ContactEditComponent,
      },
      {
        path: ':id',
        component: ContactDetailsComponent,
      },
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
