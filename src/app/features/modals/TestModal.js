import React from 'react';
import {Modal} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {modalClose} from './modalActions'

const TestModal = ({modalClose}) => {
    return (
        <Modal closeIcon="close" open={true} onClose={modalClose}>
          <Modal.Header>Test Modal</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Test Modal... nothing to see here</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
};
const mapDisptchToProps={
    modalClose
}

export default connect(null,mapDisptchToProps)(TestModal);