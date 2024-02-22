import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    handleOpenToggleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleCLoseModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
        console.log('da get duoc data', response);
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message)
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModal: false,
                })
            }
        } catch (e) {
            console.log(e)
        }
        console.log('check prop tu components con', data)

    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    openModal={this.state.isOpenModal}
                    toggleFromParent={this.toggleCLoseModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center">user react</div>
                <div className="wrap-btn">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleOpenToggleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-4">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                console.log('check data', arrUsers)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="mx-3"><i className="fas fa-pencil-alt"></i></button>
                                            <button><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
