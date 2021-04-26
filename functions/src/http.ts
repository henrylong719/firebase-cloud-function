import * as functions from 'firebase-functions';

// interactive with firestore etc.
// import * as admin from 'firebase-admin';

import * as express from 'express';

import * as cors from 'cors';

// admin.initializeApp();

// export const basicHTTP = functions.https.onRequest((request, response) => {
//   const name = request.query.name;

//   if (!name) {
//     response.status(400).send(' you must supply a name :(');
//   }

//   response.send(`hello ${name}`);

//   // functions.logger.info('Hello logs!', { structuredData: true });
//   // response.send('Hello from Firebase!');
// });

const auth = (request: any, response: any, next: any) => {
  if (!request.headers.authorization) {
    response.status(400).send('unauthorized');
  }
  next();
};

const app = express();

// allow angular access node server
// Set up CORS
app.use(
  cors({
    origin: true, // "true" will copy the domain of the request back
    // to the reply. If you need more control than this
    // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
    // authenticated via either a session cookie
    // or Authorization header. Otherwise the
    // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE', // Make sure you're not blocking
    // pre-flight OPTIONS requests
  })
);

app.use(auth);

app.get('/cat', (req, res) => {
  res.send('cat');
});

app.get('/dog', (req, res) => {
  res.send('dog');
});

export const api = functions.https.onRequest(app);
