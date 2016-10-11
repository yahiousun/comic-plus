import { HIDDEN, VISIBLE } from './constants';
class Embedded {
    constructor(url, styles, props) {
        this.defaultStyles = {
            width: '100%',
            height: '100%',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: 'fixed',
            zIndex: 2147483647
        }

        this.defaultProps = {
            frameBorder: 0,
            allowTransparency: 0
        }

        this.styles = { ...this.defaultStyles, styles };

        this.props = { ...this.defaultStyles, props };
        this.url = url;
        this.ref = document.createElement('iframe');
        for (let style of this.styles) {
            this.ref.style[style] = this.styles[style];
        }
        for (let prop of this.props) {
            this.ref[prop] = this.props[prop];
        }
        this.visibility = HIDDEN;
        this.ref.src = this.url;
    }
    show() {
        if (!document.body.contains(this.ref)) {
            document.body.appendChild(this.ref);
            this.visibility = VISIBLE;
        }
    }
    hide() {
        if (document.body.contains(this.ref)) {
            this.ref.parentNode.removeChild(this.ref);
            this.visibility = HIDDEN;
        }
    }
}
export default Embedded;
