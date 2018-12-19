import {MODAL_CLOSE,MODAL_OPEN} from './modalConstants';
import {createReducer} from '../../common/utility/reducerUtility';

const initialState=null;

export const modalClose=(state,payload)=>{
    const {modalType,modalProps}=payload;
    return {modalType,modalProps}
}

export const modalOpen=(state,payload)=>{
    return null;
}

export default createReducer(initialState,{
    [MODAL_OPEN]:modalClose,
    [MODAL_CLOSE]:modalOpen
})
   
