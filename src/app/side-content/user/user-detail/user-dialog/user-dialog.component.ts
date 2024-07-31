
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FirebaseService } from '../../../../services/firebase.service';
import { User } from '../../../../../models/user.class';
import { updateDoc } from 'firebase/firestore';



@Component({
  selector: 'app-user-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter(),],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  user: User | any;
  birthDate: Date = new Date(); 
  loading: boolean | any = false;
  formattedBirthDate: string | null = null; 

  constructor(
    private firestore: FirebaseService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private cdr: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
  }
  
  async updateUser() {
   this.loading = true;
   this.user.birthDate = new Date(this.user.birthDate)
    this.user.birthDate = this.user.birthDate.getTime()
    try {
      await this.firestore.updateUser(this.user.userId, this.user);
    } catch (err) {
      console.error('Error saving user:', err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges(); 
      this.dialogRef.close()
    }
  }

  formatTimestamp(timestamp: number): string {
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
    return `${formattedMonth}/${formattedDay}/${year}`;
  }
}
