import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
// import { FormattedMessage } from 'react-intl';



class About extends Component {

    render() {

        return (
            <div className="section-share section-about">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Truyền thông</h2>
                    </div>
                    <div className="section-body">
                        <div className="left-content">
                            <iframe width="100%" height="450px"
                                src="https://www.youtube.com/embed/CsGkwYOf7PA"
                                title="GIANT RC LOCKHEED SUPERCONSTELLATION L-1049 / HUGE SCALE MODEL AIRLINER / FLIGHT DEMONSTRATION !!!"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="right-content">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
