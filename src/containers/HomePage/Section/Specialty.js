import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import specialtyImg from '../../../assets/specialty/co-xuong-khop.png'


class Specialty extends Component {

    render() {

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Chuyên khoa phổ biến</h2>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
