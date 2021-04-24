import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function SignInBox(props) {
    return (
        <>
            {!props.isAuthenticated &&
                <div className="SignInBoxWrapper">
                    <h3>You Aren't Signed In!</h3>
                    <div className="modalline"></div>
                    <p>Register or Login to participate in the discussion</p>
                    <div className="linkWrapper">
                        <Link to="/register" className="link" style={{color: 'rgb(29,161,242)'}}>Register </Link>
                    </div>
                    <div className="linkWrapper">
                        <Link to="/login" className="link" style={{color: 'rgb(29,161,242)'}}>Login</Link>
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = (curState) => ({
    isAuthenticated: curState.tweet.isAuthenticated,
});

export default connect(mapStateToProps)(SignInBox);
