import React, { Component, PropTypes } from 'react';

const STICKY = 'sticky';

class Footer extends Component {

  get defaultStyles() {
    return {
      root: {
        width: '100%',
        height: '38px',
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
    }
  }

  constructor(props) {
    super(props);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }

  getStyles() {
    let styles = { ...this.defaultStyles };
    if (this.props.sticky === STICKY) {
      styles.root.borderTop = '1px solid #CCCCCC';
    }
    return styles;
  }

  onNext() {
    this.props.chapterSelect(this.props.next.url);
  }

  onPrev() {
    this.props.chapterSelect(this.props.previous.url)
  }

  render() {
    let styles = this.getStyles();

    let prev = null;
    let next = null

    if (this.props.previous) {
      prev = <button type="button" onClick={this.onPrev}>{chrome.i18n.getMessage('actionPreviousChapter')}</button>
    }

    if (this.props.next) {
      next = <button type="button" onClick={this.onNext}>{chrome.i18n.getMessage('actionNextChapter')}</button>
    }

    return (
      <div style={styles.root}>
        <div style={styles.container}>
          {prev} {next}
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  next: PropTypes.object,
  previous: PropTypes.object,
  chapterSelect: PropTypes.func.isRequired
}

export default Footer;
