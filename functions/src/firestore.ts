import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const gameCount = functions.firestore
  .document('game/{gameId}')
  .onCreate(async (snapshot, context) => {
    // snapshot of the document
    const data = snapshot.data();

    // get user reference
    const userRef = db.doc(`users/${data.uid}`);

    // get user snapshot
    const userSnap = await userRef.get();

    // get user data
    const userData = userSnap.data();

    return userRef.update({
      // @ts-ignore: Object is possibly 'null'.
      gameCount: userData.gameCount + 1,
    });
  });

export const userTrend = functions.firestore
  .document('game/{gameId}')
  .onUpdate((snapshot, context) => {
    // get data before update
    const before = snapshot.before.data();

    // get data after update
    const after = snapshot.after.data();

    let trend;

    if (after.score >= before.score) {
      trend = 'You are improving :)';
    } else {
      trend = 'You are on the decline :(';
    }

    const userRef = db.doc(`users/${after.uid}`);

    return userRef.update({
      trend,
    });
  });
