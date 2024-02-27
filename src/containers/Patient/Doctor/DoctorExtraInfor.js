import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';

import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: true
        }
    }
    componentDidMount() {



    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;

        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="address-text">diaj chi</div>
                    <div className="name-clinic">phong kham</div>
                    <div className="detail-address">208 nguyen hue</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="title-price-short">Giá Khám: 25000đ
                            <span onClick={() => { this.showHideDetailInfor(true) }}> Xem chi tiết</span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price">Giá khám:</div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">Giá khám:</span>
                                    <span className="right">200000đ</span>
                                </div>
                                <div className="note">Được ưu tiên</div>
                            </div>
                            <div className="payment">Thanh toán tiền mặt</div>
                            <div className="hide">
                                <span onClick={() => { this.showHideDetailInfor(false) }}>
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
