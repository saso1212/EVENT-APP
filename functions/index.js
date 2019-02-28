const functions = require('firebase-functions');
//this will initiazlize our admin premisinon in firebase cloud functions so wee don need to care abouth premision
//we will have full rights with our app
const admin=require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
//here we will create and deploy cloud functions
//createActivity is the name of our function

const newActivity = (type, event, id) => {
    return {
      type: type,
      eventDate: event.date,
      hostedBy: event.hostedBy,
      title: event.title,
      photoURL: event.hostPhotoURL,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      hostUid: event.hostUid,
      eventId: id
    };
  };

// exports.createActivity=functions.firestore
// //specify the document that we are looking for
//     .document('events/{eventId}')
//     //when the document is created the function will trigerd
//     .onCreate(event=>{
//         //this will provide with the data of the event
//         let newEvent = event.data();

//         console.log({newEvent});
//         //shape what we want to display on the screen
//         //its inport that every fill that we send have something
//         const activity=newActivity('newEvent',event,event.id)
//         console.log({activity});

//         //tell the firestore what we wan to do
//         //cretate activity colection in firestore
//         return admin.firestore().collection('activity')
//         // add will cretae id and will put activity in the colection activity
//         .add(activity)
//         .then((docRef)=>{
//             return console.log('Event created with Id', docRef.id);
//         }).catch((err)=>{
//             return console.log('Error activity',err);
//         })

//     })

    
exports.createActivity = functions.firestore.document('events/{eventId}').onCreate(event => {
    let newEvent = event.data();
  
    console.log(newEvent);
  
    const activity = newActivity('newEvent', newEvent, event.id);
  
    console.log(activity);
  
    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with id: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });

  exports.cancelActivity=functions.firestore.document('events/{eventId}').onUpdate((event,context)=>{
        let updatedEvent=event.after.data();
        let previousEventData=event.before.data();
        console.log({event})
        console.log({context});
        console.log('updated Event',{updatedEvent}),
        console.log('previous Event',{previousEventData})
        //check if the updated event is the same as the prewious 

        if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) return false
        //get teh Id from (context.params.eventId)  context not from eventId
        //we create new activity object
            const activity=newActivity('cancelledEvent',updatedEvent,context.params.eventId);
            console.log(activity);
            //create item in the activity colection
            return admin.firestore().collection('activity')
            // add will cretae id and will put activity in the colection activity
            .add(activity)
            .then((docRef)=>{
                return console.log('Event created with Id', docRef.id);
            }).catch((err)=>{
                return console.log('Error activity',err);
            })


    })

    //beacuse we dont have premision to change in the other user profile 
    //we must do with firebase functions

    exports.userFollowing = functions.firestore
    .document('users/{followerUid}/following/{followingUid}')
    .onCreate((event, context) => {
      console.log('v1');
      console.log({context});
      //we have acess in the followerUid and in the followingUid bu trigrt that event
      const followerUid = context.params.followerUid;
      const followingUid = context.params.followingUid;
      //take the doc for follower from users 
      const followerDoc = admin
        .firestore()
        .collection('users')
        .doc(followerUid);
  
      console.log(followerDoc);
      //get the currren user document
      return followerDoc.get().then(doc => {
        let userData = doc.data();
        console.log({ userData });
        let follower = {
          displayName: userData.displayName,
          photoURL: userData.photoURL || '/assets/user.png',
          city: userData.city || 'unknown city'
        };
        return admin
          .firestore()
          .collection('users')
          .doc(followingUid)
          .collection('followers')
          .doc(followerUid)
          .set(follower);
      });
    });
  
  exports.unfollowUser = functions.firestore
    .document('users/{followerUid}/following/{followingUid}')
    .onDelete((event, context) => {
      return admin
        .firestore()
        .collection('users')
        .doc(context.params.followingUid)
        .collection('followers')
        .doc(context.params.followerUid)
        .delete()
        .then(() => {
          return console.log('doc deleted');
        })
        .catch(err => {
          return console.log(err);
        });
    });