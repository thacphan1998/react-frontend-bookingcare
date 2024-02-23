import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        console.log('component didmount')
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
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

    toggleCLoseEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
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
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
        console.log('check prop tu components con', data)
    }

    saveChangeEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                })

                this.getAllUsersFromReact();
            } else {
                alert(res.message);
            }
        } catch (e) {
            console.log(e)
        }

    }

    handleEditUser = (user) => {
        console.log('edit user', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }


    handleDeleteUser = async (user) => {
        console.log("delete id user", user)
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
                alert(res.message);
            } else {
                alert(res.message);
            }
            console.log(res)
        } catch (e) {
            console.log(e);
        }
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
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        openModal={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleCLoseEditModal}
                        currentUserEdit={this.state.userEdit}
                        saveChangeEditUser={this.saveChangeEditUser}
                    />
                }
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
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={() => { this.handleEditUser(item) }} className="mx-3"><i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash-alt"></i></button>
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
