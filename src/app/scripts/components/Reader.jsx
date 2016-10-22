import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadResource } from '../actions/resource';

import { LOADING, PROGRESS, LOADED, FAILED } from '../constants/status';

class Reader extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadResource();
    }

    componentWillReceiveProps(nextProps) {  
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>Hello world!<br/> status: { this.props.status }</div>
        );
    }
}

Reader.propTypes = {
    threshold: PropTypes.number
}

Reader.defaultProps = {
    threshold: 100
}

export default connect(
    state => ({
        result: state.resource.result,
        error: state.resource.error,
        status: state.resource.status
    }),
    { loadResource }
)(Reader)