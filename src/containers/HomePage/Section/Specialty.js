import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import specialtyImg from '../../../assets/specialty/co-xuong-khop.png'


class Specialty extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };

        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <h2>Chuyên khoa phổ biến</h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className="specialty-body-slide">
                        <Slider {...settings}>
                            <div className="img-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="img-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="img-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="img-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="img-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="img-customize">
                                <a >
                                    <img src={specialtyImg} />
                                    <h3 className="title">Cơ sương khớp 1</h3>
                                </a>
                            </div>
                            <div className="img-customize">
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
