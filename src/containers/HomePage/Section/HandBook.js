import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import specialtyImg from '../../../assets/outstanding-doctor/cute-female-doctor-character_388759-625.jpg'


class HandBook extends Component {

    render() {

        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Cẩm nang</h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body-slide">
                        <Slider {...this.props.settingsSliders}>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <div className="doctor-title-wrap text-center">
                                        <h3 className="title">Giáo sư, Tiến sĩ Lê Văn Phó</h3>
                                        <h5>Cơ xương khớp</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <div className="doctor-title-wrap text-center">
                                        <h3 className="title">Giáo sư, Tiến sĩ Lê Văn Ân</h3>
                                        <h5>Cơ xương khớp</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <div className="doctor-title-wrap text-center">
                                        <h3 className="title">Giáo sư, Tiến sĩ Lê Văn Ap</h3>
                                        <h5>Cơ xương khớp</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <div className="doctor-title-wrap text-center">
                                        <h3 className="title">Giáo sư, Tiến sĩ Lê Văn A</h3>
                                        <h5>Cơ xương khớp</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <div className="doctor-title-wrap text-center">
                                        <h3 className="title">Giáo sư, Tiến sĩ Lê Văn La</h3>
                                        <h5>Cơ xương khớp</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <div className="doctor-title-wrap text-center">
                                        <h3 className="title">Giáo sư, Tiến sĩ Lê Văn Ba</h3>
                                        <h5>Cơ xương khớp</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <div className="doctor-title-wrap text-center">
                                        <h3 className="title">Giáo sư, Tiến sĩ Lê Văn B</h3>
                                        <h5>Cơ xương khớp</h5>
                                    </div>
                                </a>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
