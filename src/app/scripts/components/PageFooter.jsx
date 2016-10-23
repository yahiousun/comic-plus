import React, {Component, PropTypes} from 'react';

class PageFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <figcaption>
                {this.props.number} / {this.props.total}
            </figcaption>
        );
    }
}

PageFooter.propTypes = {
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
}

export default PageFooter;