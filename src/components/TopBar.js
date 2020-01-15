import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button
  } from 'reactstrap';
import { FaKiwiBird } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/userActions';
class TopBar extends Component {//add redux to see if authenticated. need to add logout action
    state = {
        isOpen: false
      };
    
      toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      };

      logoutReq = () =>{
        this.props.logout();
      };
    
    render() {
        const ifNotAuthNavItem = (<NavItem>
            <Link to="/register" style={{color: "white"}}>Register </Link>
            <Link to="/login" style={{color: "white"}}>Login</Link>
        </NavItem>);

        const ifAuthNavItem = (<NavItem>
            <Button onClick={this.logoutReq}>Logout</Button>
        </NavItem>);


        return (
            <div>
                <Navbar color='info' dark expand='sm' className='mb-5'>
                    <Container>
                    <NavbarBrand><FaKiwiBird/></NavbarBrand>
                        <NavbarBrand>Kiwik</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                {this.props.isAuthenticated?ifAuthNavItem:ifNotAuthNavItem}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (curState)=>({
    username: curState.tweet.username,
    isAuthenticated: curState.tweet.isAuthenticated
});

export default connect(mapStateToProps,{logout})(TopBar);