import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {

        return (
            <div className="section-homefooter">
                <div className="section-container">
                    <p>&copy; copyright 2024 FATA. <a href="https://www.facebook.com/thacphan.fata" target='_blank'>Info</a></p>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
