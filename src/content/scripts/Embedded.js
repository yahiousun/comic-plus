import { HIDDEN, VISIBLE } from './constants';
class Embedded {
    constructor(url, props, styles) {

        this.__props__ = {
            frameBorder: 0,
            allowTransparency: 0
        }
        this.__styles__ = {
            width: '100%',
            height: '100%',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: 'fixed',
            zIndex: 2147483647
        }

        this.props = { ...this.__props__, ...props };
        this.styles = { ...this.__styles__, ...styles };

        this.url = url;
        this.ref = document.createElement('iframe');

        Object.keys(this.styles).map((key) => {
            this.ref.style[key] = this.styles[key]
        })

        Object.keys(this.props).map((key) => {
            this.ref[key] = this.props[key]
        })

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
