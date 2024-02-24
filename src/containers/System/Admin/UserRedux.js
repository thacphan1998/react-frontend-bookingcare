import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import { isOmittedExpression } from 'typescript';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: ''
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return; //check ko co ảnh sẽ không hiển thị lightbox phóng to hình
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        // fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    render() {
        console.log('check state:', this.state)
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        // let isGetGenders = this.props.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        return (
            <div className="user-redux-body" >
                <div className="container">
                    <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                    <div className="row">
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.email" /></label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder='Email'
                                value={email}
                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.password" /></label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder='password'
                                value={password}
                                onChange={(event) => { this.onChangeInput(event, 'password') }}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.firstName" /></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='First Name'
                                value={firstName}
                                onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.lastName" /></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='last Name'
                                value={lastName}
                                onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.phoneNumber" /></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Phone number'
                                value={phoneNumber}
                                onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                            />
                        </div>
                        <div className="col-9">
                            <label><FormattedMessage id="manage-user.address" /></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Address'
                                value={address}
                                onChange={(event) => { this.onChangeInput(event, 'address') }}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.gender" /></label>
                            <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                {genders && genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.position" /></label>
                            <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                {positions && positions.length > 0 &&
                                    positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.roleId" /></label>
                            <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                {roles && roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.image" /></label>
                            <div className="wrap-upload-img">
                                <input id="prewviewImg" type="file" hidden onChange={(event) => { this.handleOnChangeImage(event) }} />
                                <label htmlFor='prewviewImg'>Tải ảnh <i className="fas fa-file-upload"></i></label>
                                <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgUrl})` }} onClick={() => { this.openPreviewImage() }}></div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={() => { this.handleSaveUser() }}>Save</button>
                        </div>
                        <div className="col-12">
                            <TableManageUser />
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => { this.setState({ isOpen: false }) }}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        // ========
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
