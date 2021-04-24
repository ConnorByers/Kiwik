import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

class TopBar extends Component {
    state = {
        isOpen: false
    };
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    logoutReq = () => {
        this.props.logout();
    };
    
    render() {
        const ifNotAuthNavItem = (
            <div>
                <Link to="/register" style={{color: "white"}}>Register </Link>
                <Link to="/login" style={{color: "white"}}>Login</Link>
            </div>
        );

        const ifAuthNavItem = (
            <span>
                <button onClick={this.logoutReq}>Logout</button>
            </span>
        );

        return (
            <div>
                <h1>Kiwik</h1>
                <button onClick={this.toggle} />
                {this.props.isAuthenticated ? ifAuthNavItem : ifNotAuthNavItem}
            </div>
        )
    }
}

const mapStateToProps = (curState) => ({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
