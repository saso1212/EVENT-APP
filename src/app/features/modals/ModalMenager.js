import React from 'react';
import {connect} from 'react-redux';
import TestModal from './TestModal'

const modalLockup={
    TestModal
}

const ModalMenager = ({currentModal}) => {
    let renderModal;

    if (currentModal){
        const {modalType,modalProps}=currentModal;
        const ModalComponent=modalLockup[modalType];

        renderModal=<ModalComponent {...modalProps}/>
    }
    return <span>{renderModal}</span>
    ;
};

const mapStateToProps=(state)=>({
    currentModal:state.modals
})

export default connect(mapStateToProps)(ModalMenager);