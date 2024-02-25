import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],

        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    hanldeDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    hanldeEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    }


    render() {
        console.log('celkjhjkjnknjnjntatatatttt', this.props.listUsers);
        let arrUsers = this.state.userRedux;
        console.log('check arrUser:', arrUsers)
        return (
            <table id='table-manage-user'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button onClick={() => { this.hanldeEditUser(item) }} className="mx-3"><i className="fas fa-pencil-alt"></i></button>
                                        <button onClick={() => { this.hanldeDeleteUser(item) }}><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => { dispatch(actions.deleteUserStart(id)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
