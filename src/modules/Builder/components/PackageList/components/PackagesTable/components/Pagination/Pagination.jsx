import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Pagination extends Component {
    static propTypes = {
        currentPageNumber: PropTypes.number,
        onChange: PropTypes.func,
        paginationPagesCount: PropTypes.number,
        totalPages: PropTypes.number,
    }

    static defaultProps = {
        currentPageNumber: 0,
        paginationPagesCount: 0,
        totalPages: 0,
    }

    constructor(props) {
        super(props);

        this.state = { currentPageNumber: props.currentPageNumber };

        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(event) {
        let targetId = event.target.id
        let currentPageNumber = parseInt(targetId);

        if (targetId === "previous")
            currentPageNumber = this.state.currentPageNumber - 1;
        else if (targetId === "next")
            currentPageNumber = this.state.currentPageNumber + 1;

        this.setState(() => ({ currentPageNumber }));

        this.props.onChange(currentPageNumber);
    }

    render() {
        let previousStatus = this.state.currentPageNumber == 1 ? "disabled" : "";
        let nextStatus = this.state.currentPageNumber == this.props.totalPages ? "disabled" : "";

        let paginationMiddleValue = Math.round(this.props.paginationPagesCount / 2);

        let forValue;
        if (this.state.currentPageNumber <= paginationMiddleValue)
            forValue = 1;
        else if (this.state.currentPageNumber + paginationMiddleValue > this.props.totalPages)
            forValue = this.props.totalPages - this.props.paginationPagesCount + 1;
        else
            forValue = this.state.currentPageNumber - paginationMiddleValue + 1;

        let paginationPages = new Array(this.props.paginationPagesCount).fill(0).map(_ => {
            let buf = forValue;
            forValue += 1;
            return buf;
        });

        return (
            <ul className="pagination">
                <li className={"paginate_button page-item previous " + previousStatus}>
                    <a className="page-link" id="previous" onClick={this.onPageChange}>Previous</a>
                </li>
                {paginationPages.map(item => {
                    let isActive = item == this.state.currentPageNumber ? "active" : "";
                    return (
                        <li className={"paginate_button page-item " + isActive} key={item}>
                            <a className="page-link" id={item} onClick={this.onPageChange}>{item}</a>
                        </li>
                    )
                })}
                <li className={"paginate_button page-item next " + nextStatus}>
                    <a className="page-link" id="next" onClick={this.onPageChange}>Next</a>
                </li>
            </ul>
        )
    }
}
