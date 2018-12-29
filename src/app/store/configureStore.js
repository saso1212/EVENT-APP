import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import firebase from '../config/firebase'
import {composeWithDevTools} from 'redux-devtools-extension';
import {reactReduxFirebase,getFirebase} from 'react-redux-firebase';
import {reduxFirestore,getFirestore} from 'redux-firestore';
//this so we can use somethig more than dispatch and getSata in thunk
const rrfConfig={
    userProfile:'user',
    attachAuthIsRedu:true,
    useFirestoreForProfile:true
}
export const configureStore=(preloadedState)=>{
    const middlewares=[thunk.withExtraArgument({getFirebase,getFirestore})];
    const middlewareEnhacer=applyMiddleware(...middlewares);
    const storeEnhacers=[middlewareEnhacer];

    const composedEnhacers=composeWithDevTools(
        ...storeEnhacers,
        reactReduxFirebase(firebase,rrfConfig),
        reduxFirestore(firebase)
        );

    const store=createStore(
        rootReducer,
        preloadedState,
        composedEnhacers
    )
    if (process.env.NODE_ENV !=='propduction'){
        if (module.hot){
            module.hot.accept('../reducers/rootReducer',()=>{
                const newRootReducer=require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer)
            })
        }
    }

    return store;
}