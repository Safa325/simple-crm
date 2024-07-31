import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { User } from '../../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { FirebaseService } from '../../services/firebase.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    AddDialogComponent,
    MatDialogModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  user = new User();
  allUsers: User []= []

  constructor(public dialog: MatDialog, private firestore: FirebaseService){}

  openAddDialog(){
    this.dialog.open(AddDialogComponent)
  }

  async ngOnInit(): Promise<void> {
    this.firestore.loadAllDocuments(this.firestore.CRMcollection, (users: User[]) => {
      this.allUsers = users;
    });
  }
}
