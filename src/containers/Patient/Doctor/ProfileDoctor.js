import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {

        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }

    }

    rendertimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = language === LANGUAGES.VI ? dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn;

            let data = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {data}</div>
                    <div><FormattedMessage id="patient.booking-modal.price-booking" /></div>
                </>
            )
        }
        return
    }


    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataScheduleTimeModal } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName} `;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left" style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}></div>
                    <div className="content-right">
                        <div className="content-up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="content-down">
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>

                                :

                                <>
                                    {this.rendertimeBooking(dataScheduleTimeModal)}
                                </>
                            }



                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price" />
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.VI &&
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_infor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }

                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.EN &&
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
