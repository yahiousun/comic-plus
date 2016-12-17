import React, { Component, PropTypes } from 'react';

const STICKY = 'sticky';

class Header extends Component {

  get defaultStyles() {
    return {
      root: {
        width: '100%',
        height: '62px',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF'
      },
      shadow: {
        visablity: 'hidden',
      },
      container: {
        maxWidth: '1140px',
        padding: '0 15px',
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      title: {
        fontSize: '2.4rem',
        fontWeight: 'normal',
        margin: 0
      }
    }
  }
  
  getStyles() {
    let styles = { ...this.defaultStyles };
    if (this.props.sticky === STICKY) {
      styles.root.borderBottom = '1px solid #CCCCCC';
    }
    return styles;
  }

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <h1 style={styles.title}>{this.props.title}</h1>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
