import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MedicalFacility.scss';
import Slider from 'react-slick';

import specialtyImg from '../../../assets/medical-facility/083122lo-go-viet-duc.jpg'


class MedicalFacility extends Component {

    render() {

        return (

            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Cơ sở y tế</h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body-slide">
                        <Slider {...this.props.settingsSliders}>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="section-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
