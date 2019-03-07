import React from 'react';
import {connect} from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UnauthModal from './UnauthModal'

const modalLockup={
    TestModal,
    LoginModal,
    RegisterModal,
    UnauthModal
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