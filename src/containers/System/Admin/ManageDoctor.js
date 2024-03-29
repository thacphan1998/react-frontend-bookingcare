import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table data
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // save to doctor info table data
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
    }

    buildDatInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDatInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDatInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDatInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDatInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDatInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDatInputSelect(resClinic, 'CLINIC');

            console.log(dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDatInputSelect(this.props.allDoctors, 'USERS');

            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDatInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDatInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDatInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveInfoDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }



    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;

        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic = '',
                note = '', paymentId = '',
                priceId = '', provinceId = '',
                specialtyId = '', clinicId = '',
                selectedPayment = '', selectedPrice = '',
                selectedProvince = '', selectedSpecialty = '', selectedClinic = '';

            if (res.data.Doctor_infor) {
                addressClinic = res.data.Doctor_infor.addressClinic;
                nameClinic = res.data.Doctor_infor.nameClinic;
                note = res.data.Doctor_infor.note;
                paymentId = res.data.Doctor_infor.paymentId;
                priceId = res.data.Doctor_infor.priceId;
                provinceId = res.data.Doctor_infor.provinceId;
                specialtyId = res.data.Doctor_infor.specialtyId;
                clinicId = res.data.Doctor_infor.clinicId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })

                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })


            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
        console.log('check selectedValue', res)
    };

    handleChangeSelectDoctorInfor = async (seclectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };

        stateCopy[stateName] = seclectedOption;

        this.setState({
            ...stateCopy
        })
        console.log('check new selec onchange', seclectedOption, stateName)
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData, listSpecialty } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => { this.handleOnChangeText(event, 'description') }}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => { this.handleOnChangeText(event, 'nameClinic') }}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.address" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => { this.handleOnChangeText(event, 'addressClinic') }}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => { this.handleOnChangeText(event, 'note') }}
                            value={this.state.note}
                        />
                    </div>
                    <div className="col-4">
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-4">
                        <label><FormattedMessage id="admin.manage-doctor.clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '350px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                    onClick={() => { this.handleSaveContentMarkdown() }}
                >
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveInfoDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctorService(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
