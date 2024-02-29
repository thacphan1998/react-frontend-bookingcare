import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MedicalFacility.scss';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router';

// import specialtyImg from '../../../assets/medical-facility/083122lo-go-viet-duc.jpg'


class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }

        console.log('check res clinic', res)
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }

    render() {
        let { dataClinics } = this.state;

        return (

            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Cơ sở y tế</h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body-slide">
                        <Slider {...this.props.settingsSliders}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize clinic-item"
                                            key={index}
                                            onClick={() => { this.handleViewDetailClinic(item) }}
                                        >
                                            <a >
                                                <img src={item.image} />
                                                <h3 className="title-clinic">{item.name}</h3>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
