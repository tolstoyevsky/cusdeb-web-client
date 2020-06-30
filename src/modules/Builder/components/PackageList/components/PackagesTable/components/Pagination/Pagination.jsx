import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination as BootsrapPagination } from "react-bootstrap";

export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { currentPage } = this.state;
        const { paginationPagesMaxCount, totalPages } = this.props;

        if (totalPages !== prevProps.totalPages && currentPage > totalPages) {
            let paginationPagesCount = paginationPagesMaxCount;
            if (totalPages < paginationPagesMaxCount) {
                paginationPagesCount = totalPages;
            }

            this.setCurrentPage(paginationPagesCount);
        }
    }

    onPageChange(event) {
        if (event.target.classList.contains("disabled")) {
            return;
        }

        const { currentPage } = this.state;
        const { onChange } = this.props;
        const targetId = event.target.id;

        let nextPageNumber = parseInt(targetId, 10);
        if (targetId === "prev") {
            nextPageNumber = currentPage - 1;
        } else if (targetId === "next") {
            nextPageNumber = currentPage + 1;
        }

        this.setState(() => ({
            currentPage: nextPageNumber,
        }));

        onChange(nextPageNumber);
    }

    setCurrentPage(numberPage) {
        const { currentPage } = this.state;
        const { onChange } = this.props;

        if (currentPage === numberPage) {
            return;
        }

        this.setState(() => ({ currentPage: numberPage }));

        onChange(numberPage);
    }

    render() {
        const { currentPage } = this.state;
        const { paginationPagesMaxCount, totalPages } = this.props;

        if (totalPages <= 1) {
            return null;
        }

        let paginationPagesCount = paginationPagesMaxCount;
        if (totalPages < paginationPagesMaxCount) {
            paginationPagesCount = totalPages;
        }

        const paginationMiddleValue = Math.round(paginationPagesCount / 2);

        let forValue;
        if (currentPage <= paginationMiddleValue) {
            forValue = 1;
        } else if (currentPage + paginationMiddleValue > totalPages) {
            forValue = totalPages - paginationPagesCount + 1;
        } else {
            forValue = currentPage - paginationMiddleValue + 1;
        }

        const paginationPages = new Array(paginationPagesCount).fill(0).map(() => {
            const buf = forValue;
            forValue += 1;
            return buf;
        });

        return (
            <BootsrapPagination onClick={this.onPageChange} onChange={this.setCurrentPage} className="mb-0">
                <BootsrapPagination.Item id="prev" disabled={currentPage === 1}>‹</BootsrapPagination.Item>
                {paginationPages.map((page) => (
                    <BootsrapPagination.Item
                        key={page}
                        active={page === currentPage}
                        id={page}
                    >
                        {page}
                    </BootsrapPagination.Item>
                ))}
                <BootsrapPagination.Item id="next" disabled={currentPage === totalPages}>›</BootsrapPagination.Item>
            </BootsrapPagination>
        );
    }
}

Pagination.propTypes = {
    onChange: PropTypes.func.isRequired,
    paginationPagesMaxCount: PropTypes.number,
    totalPages: PropTypes.number,
};

Pagination.defaultProps = {
    paginationPagesMaxCount: 0,
    totalPages: 0,
};
