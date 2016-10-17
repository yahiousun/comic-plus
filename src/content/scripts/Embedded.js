import { ACTIVE, INACTIVE, PENDING } from './constants'
class Embedded {
    get defaultStyles() {
        return {
            width: '100%',
            height: '100%',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: 'fixed',
            zIndex: 2147483647
        }
    }
    get defaultProps() {
        return {
            frameBorder: 0,
            allowTransparency: 0
        }
    }
    constructor(url, props, styles, active) {
        this.url = url;
        this.props = { ...this.defaultProps, ...props };
        this.styles = { ...this.defaultStyles, ...styles };
        this.state = null;
        this.ref = null;

        if (active) {
            this.activate();
        }
    }

    setStyle(styles) {
        Object.keys(styles).map((key) => {
            this.ref.style[key] = this.styles[key]
        });
    }

    setProp(props) {
        Object.keys(props).map((key) => {
            this.ref[key] = this.props[key]
        });
    }

    onLoad() {
        if (this.state === PENDING) {
            this.state = ACTIVE;
        }
    }

    onActivate() {}

    onDeactivate() {}

    activate() {
        if (!document.body.contains(this.ref) && this.state !== PENDING && this.state !== ACTIVE) {

            this.state = PENDING;

            this.ref = document.createElement('iframe');

            this.setStyle(this.styles);

            this.setProp(this.props);

            this.ref.addEventListener('load', this.onLoad.bind(this), false);

            this.ref.src = this.url;

            this.onActivate();

            document.body.appendChild(this.ref);
        }
    }

    deactivate() {
        if (document.body.contains(this.ref)  && this.state !== PENDING && this.state !== INACTIVE) {
            this.ref.parentNode.removeChild(this.ref);
            this.ref.removeEventListener('load', this.onLoad.bind(this), false);
            this.ref = null;
            this.state = INACTIVE;
            this.onDeactivate();
        }
    }

    toggle() {
        if (this.state === ACTIVE) {
            this.deactivate();
        }
        else if (this.state !== PENDING) {
            this.activate();
        }
    }

    realod() {
        this.deactivate();
        this.activate();
    }
}

export default Embedded;