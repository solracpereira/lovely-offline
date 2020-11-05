import { NotesAddComponent } from './notes-add/notes-add.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteDetailsComponent } from './note-details/note-details.component';

const routes: Routes = [
  {
    path: "",
    component: NotesListComponent
    },
    {
    path: "add",
    component: NotesAddComponent
    },
    {
    path: ":id",
    component: NoteDetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
