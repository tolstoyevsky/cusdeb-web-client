import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = { currentPageNumber: props.currentPageNumber };

        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(event) {
        const { currentPageNumber } = this.state;
        const { onChange } = this.props;

        const targetId = event.target.id;
        let nextPageNumber = parseInt(targetId, 10);

        if (targetId === "previous") {
            nextPageNumber = currentPageNumber - 1;
        } else if (targetId === "next") {
            nextPageNumber = currentPageNumber + 1;
        }

        this.setState(() => ({
            currentPageNumber: nextPageNumber,
        }));

        onChange(nextPageNumber);
    }

    render() {
        const { currentPageNumber } = this.state;
        const { paginationPagesCount, totalPages } = this.props;

        const previousStatus = currentPageNumber === 1 ? "disabled" : "";
        const nextStatus = currentPageNumber === totalPages ? "disabled" : "";

        const paginationMiddleValue = Math.round(paginationPagesCount / 2);

        let forValue;
        if (currentPageNumber <= paginationMiddleValue) {
            forValue = 1;
        } else if (currentPageNumber + paginationMiddleValue > totalPages) {
            forValue = totalPages - paginationPagesCount + 1;
        } else {
            forValue = currentPageNumber - paginationMiddleValue + 1;
        }

        const paginationPages = new Array(paginationPagesCount).fill(0).map(() => {
            const buf = forValue;
            forValue += 1;
            return buf;
        });

        return (
            <ul className="pagination">
                <li className={`paginate_button page-item previous ${previousStatus}`}>
                    <button type="button" className="page-link" id="previous" onClick={this.onPageChange}>Previous</button>
                </li>
                {paginationPages.map((item) => {
                    const isActive = item === currentPageNumber ? "active" : "";
                    return (
                        <li className={`paginate_button page-item ${isActive}`} key={item}>
                            <button type="button" className="page-link" id={item} onClick={this.onPageChange}>{item}</button>
                        </li>
                    );
                })}
                <li className={`paginate_button page-item next ${nextStatus}`}>
                    <button type="button" className="page-link" id="next" onClick={this.onPageChange}>Next</button>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = {
    currentPageNumber: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    paginationPagesCount: PropTypes.number,
    totalPages: PropTypes.number,
};

Pagination.defaultProps = {
    currentPageNumber: 0,
    paginationPagesCount: 0,
    totalPages: 0,
};
