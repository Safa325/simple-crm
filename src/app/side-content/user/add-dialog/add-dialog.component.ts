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
import { User } from '../../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
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
    MatProgressBarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDialogComponent {
  user = new User();
  loading: boolean | any = false;

  constructor(
    private firestore: FirebaseService,
     private cdr: ChangeDetectorRef,
     public dialogRef: MatDialogRef<AddDialogComponent>) {}

  closeDialog(){
    this.dialogRef.close(AddDialogComponent)
  }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = new Date(this.user.birthDate)
    this.user.birthDate = this.user.birthDate.getTime()
    console.log(this.user.birthDate)
   
    try {
      await this.firestore.addUser(this.user);
    } catch (err) {
      console.error('Error saving user:', err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges(); 
      this.dialogRef.close()
    }
  }
  
}
