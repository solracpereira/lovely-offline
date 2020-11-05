import { SnackBarService } from './../../core/snack-bar.service';
import { DataService } from './../../core/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss']
})
export class NotesAddComponent implements OnInit {
  public userID;
  public errorMessages$ = new Subject();

  constructor(
    private router: Router,
    private data: DataService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  onSaveNote(values) {
    this.data
      .addNote(values)
      .then(doc => {
        this.router.navigate(["/notes"]);
        this.snackBar.open(`Note ${doc.id} has been succeffully saved`);
      })
      .catch(e => {
        this.errorMessages$.next("something is wrong when adding to DB");
      });
  }
  
  onSendError(message) {
    this.errorMessages$.next(message);
  }
  
}
