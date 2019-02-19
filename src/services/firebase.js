import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyC_KjJxrN8Mjim_Si-nxlJaQo9QbEFqrgo',
  authDomain: 'talk-4ee9d.firebaseapp.com',
  databaseURL: 'https://talk-4ee9d.firebaseio.com',
  projectId: 'talk-4ee9d',
  storageBucket: 'talk-4ee9d.appspot.com',
  messagingSenderId: '758693543092'
};

if (!app.apps.length) app.initializeApp(config);
const db = app.database();
// this.auth = app.auth();
const firebase = {};
firebase.getRooms = async function() {
  const snapshot = await db.ref('/rooms').once('value');
  if (!snapshot || !snapshot.val()) return Promise.resolve([]);
  return Promise.resolve(
    Object.entries(snapshot.val()).map(([key, room]) => {
      return { key: key, title: room.title };
    })
  );
};

firebase.addRoom = async function(title) {
  const key = db.ref('/rooms').push().key;
  const updates = {};
  updates[`/rooms/${key}/`] = { title: title };
  updates[`/chats/${key}/`] = [];
  await db.ref().update(updates);
};

firebase.getChats = function(roomKey, cb) {
  const chatsRef = db.ref(`/chats/${roomKey}`);
  chatsRef.on('value', function(snapshot) {
    cb(snapshot.val());
  });
};

export default firebase;

// *** Auth API ***

/* doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password); */
