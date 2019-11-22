import React, { Component } from 'react';
import ReactModal from 'react-modal';
import "bootstrap/dist/css/bootstrap.min.css";



class MyModal extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        return (
            <div>
                <button onClick={this.handleOpenModal}>
                    <span className="glyphicon glyphicon-fullscreen"></span>
                </button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button className={"float-right"} onClick={this.handleCloseModal}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                    <div className={"blogHead"}>
                        <span> {this.props.title} </span>
                    </div>
                    <div className={"date"}>
                        <span><span>Date of Publishing :</span>&nbsp; &nbsp;{this.props.date}</span>
                    </div>
                    <div className={"blogBody"}>
                        {this.props.blogD}
                    </div>
                </ReactModal>
            </div>
        );
    }
}

const props = {};

export default MyModal;