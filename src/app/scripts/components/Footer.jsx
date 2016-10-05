import React, {Component, PropTypes} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

Footer.propTypes = {
    prev: PropTypes.object,
    next: PropTypes.object,
    onPrev: PropTypes.func,
    onNext: PropTypes.func
}

export default Footer;