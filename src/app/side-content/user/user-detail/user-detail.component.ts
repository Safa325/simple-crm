import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirebaseService } from '../../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    UserDialogComponent,
    MatMenuModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'] 
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  formattedBirthDate: string | null = null; // Neue Variable für das formatierte Datum
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private firestore: FirebaseService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: any) => {
      this.firestore.loadUser(params.id, (user: User) => {
        if (user) {
          this.user = user;
          this.formattedBirthDate = this.formatTimestamp(this.user.birthDate); // Formatieren des Geburtsdatums für die Anzeige
        } else {
          console.error('User not found');
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }

  formatTimestamp(timestamp: number | Date): string {
    // Konvertiere den Timestamp in ein Date-Objekt
    const date = new Date(timestamp);

    // Hole Tag, Monat und Jahr aus dem Date-Objekt
    const day = date.getDate();
    const month = date.getMonth() + 1; // Monate sind 0-basiert, daher +1
    const year = date.getFullYear();

    // Formatiere Tag und Monat mit führender Null, falls nötig
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Gib das Datum im Format Tag/Monat/Jahr zurück
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  openUserDialog(){
    const dialog = this.dialog.open(UserDialogComponent)
    dialog.componentInstance.user = new User(this.user)
    
  }

  
}
