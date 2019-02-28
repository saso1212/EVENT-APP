export const userDetailedQuery = ({ auth, userUid,match }) => {
    if (userUid !== null) {
      return [
        {
          collection: 'users',
          doc: userUid,
          storeAs: 'profile'
        },
        {
          collection: 'users',
          doc: userUid,
          subcollections: [{ collection: 'photos' }],
          storeAs: 'photos'
        },
        {
          collection: 'users',
          doc: auth.uid,
          //this is check if there is foolowing users {collection: 'following', doc: match.params.id}
          subcollections: [{collection: 'following', doc: match.params.id}],
          storeAs: 'following'
        }
      ];
    } else {
      return [
        {
          collection: 'users',
          doc: auth.uid,
          subcollections: [{ collection: 'photos' }],
          storeAs: 'photos'
        }
      ];
    }
  };