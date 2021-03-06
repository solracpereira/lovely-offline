import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lovely-offline';
  notes$: Observable<any[]>;
  hide = true;

  constructor(db: AngularFirestore) {
    this.notes$ = db.collection('/notes').valueChanges();    
  }
}
