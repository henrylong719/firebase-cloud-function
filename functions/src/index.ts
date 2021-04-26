export { api } from './http';

export { createUserRecord } from './auth';

// testing  background functions
// 1. npm run shell (auth error)
// 2. heading to service accounts and generate new private key
// 3. save as service-account.json under function folder
// 4. in the terminal:
// export GOOGLE_APPLICATION_CREDENTIALS=/Users/henrylong/Desktop/Firebase&Firestore/firebase-cloud-function/functions/service-account.json
// 5. npm run shell
// firebase > createUserRecord({uid:"henry"})

export { gameCount, userTrend } from './firestore';
