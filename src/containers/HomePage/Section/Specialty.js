import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

// import specialtyImg from '../../../assets/specialty/co-xuong-khop.png'


class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log('check state', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        let { dataSpecialty } = this.state

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <h2><FormattedMessage id="homepage.specialty-popular" /></h2>
                        <button><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className="section-body-slide">
                        <Slider {...this.props.settingsSliders}>
                            {
                                dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className="section-customize"
                                            key={index}
                                            onClick={() => { this.handleViewDetailSpecialty(item) }}
                                        >
                                            <a >
                                                <img src={item.image} />
                                                <h3 className="title">{item.name}</h3>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
