import React, { Component, PropTypes } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {  
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <h1>{this.props.title}</h1>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;