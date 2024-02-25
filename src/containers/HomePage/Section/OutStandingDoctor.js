import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

import specialtyImg from '../../../assets/outstanding-doctor/cute-female-doctor-character_388759-625.jpg'
import { FormattedMessage } from 'react-intl';


class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {
        let allDoctors = this.state.arrDoctors;
        let { language } = this.props;
        // allDoctors = allDoctors.concat(allDoctors).concat(allDoctors);
        return (
            <div className="section-share section-outStanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <h2><FormattedMessage id="homepage.outstanding-doctor" /></h2>
                        <button><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className="section-body-slide">
                        <Slider {...this.props.settingsSliders}>

                            {allDoctors && allDoctors.length > 0 &&
                                allDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName} `;
                                    return (
                                        <div className="section-customize" key={index}>
                                            <a >
                                                <img src={imageBase64} />
                                                <div className="doctor-title-wrap text-center">
                                                    <h3 className="title">{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                                                    <h5>Cơ xương khớp</h5>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })
                            }
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
        topDoctorsRedux: state.admin.topDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
