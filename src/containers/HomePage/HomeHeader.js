import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    handleLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    logoReturnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="logo" onClick={() => { this.logoReturnToHome() }}>
                            </div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div className="title"><b> <FormattedMessage id="homeheader.speciality" /></b> </div>
                                <div className="sub-title"><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className="child-content">
                                <div className="title"><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.seclect-room" /></div>
                            </div>
                            <div className="child-content">
                                <div className="title"><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div className="title"><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}><span onClick={() => { this.handleLanguage(LANGUAGES.VI) }}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}><span onClick={() => { this.handleLanguage(LANGUAGES.EN) }}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up-wrap">
                            <div className="title-1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title-2"><FormattedMessage id="banner.title2" /></div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder='Search bác sĩ' />
                            </div>
                        </div>
                        <div className="content-down-wrap">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-stethoscope"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-vials"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-heartbeat"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fab fa-affiliatetheme"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
