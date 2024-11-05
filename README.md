rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    match /goals/{goal} {
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;
      allow create: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}