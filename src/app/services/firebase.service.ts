import { inject, Injectable } from "@angular/core";
import { collectionData, Firestore, addDoc, getDoc, doc, getFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, CollectionReference, DocumentData, DocumentReference, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { bindCallback, Observable } from "rxjs";
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);
  CRMcollection = collection(this.firestore, 'SimpleCRM');
  id = '';
  

  constructor() {}

  async updateUser(id: string, user: User) {
    const docRef: DocumentReference = doc(this.CRMcollection, id);
    try {
      await updateDoc(docRef, user.toJSON());
      console.log("Document successfully updated.");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }


  async addUser(user: User) {
    try {
      const docRef = await addDoc(this.CRMcollection, user.toJSON());
      user.userId = docRef.id;
      await updateDoc(docRef, user.toJSON());
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  }


  loadAllDocuments(collectionRef: CollectionReference<DocumentData>, callback: (users: User[]) => void): void {
    onSnapshot(collectionRef, (snapshot) => {
        let allUsers: User[] = [];
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach((doc) => {
          const userData = doc.data() as DocumentData;
            const userId = doc.id; 
            let user = new User({ ...userData, userId }); 
            allUsers.push(user);
        });
        callback(allUsers);
    });
}


// async loadUser(id: string): Promise<User> {
//   this.id = id;
//   const docRef: DocumentReference = doc(this.CRMcollection, this.id);

//   return new Promise((resolve, reject) => {
//     onSnapshot(docRef, (doc) => {
//       if (doc.exists()) {
//         const userData = doc.data() as DocumentData;
//         let user = new User(userData);
//         resolve(user);
//       } else {
//         console.log("No such document!");
        
//       }
//     }, reject); // Falls ein Fehler bei onSnapshot auftritt
//   });
// }



loadUser(id: string, callback: (user: User) => void): void {
  const docRef: DocumentReference = doc(this.CRMcollection, id);

  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const userData = doc.data() as DocumentData;
      let user = new User({ ...userData, userId: doc.id });
      callback(user);
    } else {
      console.log("No such document!");
      
    }
  }, (error) => {
    console.error('Error loading user:', error);
    
  });
}
}


