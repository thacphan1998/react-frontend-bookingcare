import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        //  xu ly cac input onchange trong 1 ham dua vao id da dc truyen trong funct 
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check loop', this.state[arrInput[i]], arrInput[i])
            // if neu khong truyen value vao input se alert ra value do
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            // call api create modal
            this.props.createNewUser(this.state);
        }

    }
    render() {
        return (
            <Modal isOpen={this.props.openModal} toggle={() => { this.toggle() }} className={'modal-user-container'} size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }} >
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label >Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div class="form-group col-6">
                            <label >Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password}
                            />
                        </div>
                        <div class="form-group col-6">
                            <label >First Name</label>
                            <input type="text"
                                className="form-control"
                                name="firstName"
                                placeholder="First Name"
                                onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div class="form-group col-6">
                            <label >Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div class="form-group col-12 address">
                            <label >Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                placeholder="1234 Main St"
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleAddNewUser() }}
                    >
                        Add new user
                    </Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);






