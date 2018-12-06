import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

export const configureStore=(preloadedState)=>{
    const middlewares=[];
    const middlewareEnhacer=applyMiddleware(...middlewares);
    const storeEnhacers=[middlewareEnhacer];

    const composedEnhacers=composeWithDevTools(...storeEnhacers);

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