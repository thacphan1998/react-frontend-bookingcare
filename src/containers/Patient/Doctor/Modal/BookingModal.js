import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';

import { Modal } from 'reactstrap';
import _ from 'lodash';


class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {



    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {

        }

    }

    // toggle

    render() {

        let { isOpenModalBooking, closeModalSheduleBooking, dataScheduleTimeModal } = this.props;
        let doctorId = '';
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            doctorId = dataScheduleTimeModal.doctorId;
        }
        console.log('data time', dataScheduleTimeModal)
        return (
            <div>
                <Modal
                    isOpen={isOpenModalBooking}
                    className={"booking-modal-container"}
                    size='lg'
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">Thông tin đặt lịch khám bệnh</span>
                            <span
                                className="right"
                                onClick={closeModalSheduleBooking}
                            >
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body container">
                            {/* {JSON.stringify(dataScheduleTimeModal)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ tên</label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ Email</label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt cho ai</label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input className="form-control" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn-booking-confirm">Xác nhận</button>
                            <button
                                className="btn-booking-cancel"
                                onClick={closeModalSheduleBooking}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
