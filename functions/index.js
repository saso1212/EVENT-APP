const functions = require('firebase-functions');
//this will initiazlize our admin premisinon in firebase cloud functions so wee don need to care abouth premision
//we will have full rights with our app
const admin=require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
//here we will create and deploy cloud functions
//createActivity is the name of our function


exports.createActivity=functions.firestore
//specify the document that we are looking for
    .document('events/{eventId}')
    //when the document is created the function will trigerd
    .onCreate(event=>{
        //this will provide with the data of the event
        let newEvent=event.data();

        console.log({newEvent});
        //shape what we want to display on the screen
        //its inport that every fill that we send have something
        const activity={
            type:'newEvent',
            eventDate:newEvent.date,
            hostedBy:newEvent.hostedBy,
            title:newEvent.title,
            photoURL:newEvent.hostPhotoURL || '/assets/user.png',
            timestamp:admin.firestore.FieldValue.serverTimestamp(),
            hostUid:newEvent.hostUid,
            eventId:event.id
        }
        console.log({activity});

        //tell the firestore what we wan to do
        //cretate activity colection in firestore
        return admin.firestore().collection('activity')
        // add will cretae id and will put activity in the colection activity
        .add(activity)
        .then((docRef)=>{
            return console.log('Event created with Id', docRef.id);
        }).catch((err)=>{
            return console.log('Error activity',err);
        })

    })
