import * as functions from 'firebase-functions';

//Access Google Cloud resources like Cloud Storage buckets and
// Cloud Firestore databases associated with your Firebase projects.
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const createUserRecord = functions.auth
  .user()
  .onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`);

    return userRef.set({
      name: user.displayName,
      createdAt: context.timestamp,
      nickname: 'bc',
    });
  });
