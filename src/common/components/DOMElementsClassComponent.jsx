import { Component } from "react";

export default class DOMElementsClassComponent extends Component {
    static cleanBody() {
        /**
         * If the css-class doesn't have time to be set before JavaScript initialization
         * AdminLTE-AdminLTE sets body height="auto", which causes the page blocks
         * to be positioned incorrectly.
         * */

        if ("height" in document.body.style && document.body.style.height === "auto") {
            document.body.style.height = null;
            return true;
        }
        return false;
    }

    constructor(props) {
        super(props);

        this.bodyClass = undefined;
        this.DOMElementsClass = {};
    }

    componentDidMount() {
        if (this.bodyClass) {
            document.body.classList.add(this.bodyClass);

            const cleanResult = DOMElementsClassComponent.cleanBody();

            if (!cleanResult) {
                let attempt = 0;
                const interval = setInterval(() => {
                    const intervalCleanResult = DOMElementsClassComponent.cleanBody();

                    attempt += 1;
                    if (intervalCleanResult || attempt === 10) {
                        clearInterval(interval);
                    }
                }, 200);
            }
        }

        Object.keys(this.DOMElementsClass).forEach((DOMElementQuery) => {
            document.querySelector(DOMElementQuery).classList.add(
                this.DOMElementsClass[DOMElementQuery],
            );
        });
    }

    componentWillUnmount() {
        if (this.bodyClass) {
            document.body.classList.remove(this.bodyClass);
        }

        Object.keys(this.DOMElementsClass).forEach((DOMElementQuery) => {
            document.querySelector(DOMElementQuery).classList.remove(
                this.DOMElementsClass[DOMElementQuery],
            );
        });
    }
}
