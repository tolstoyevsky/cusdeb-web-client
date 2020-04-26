import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";

import Card from "common/containers/Card";
import Input from "common/components/Input";
import Select from "common/components/Select";
import InputGroup from "common/components/InputGroup";

import Blackmagic from "api/rpc/blackmagic";

import { spaceSeparation } from "utils/filters";

import Pagination from "./components/Pagination/Pagination";
import prepareTableItem from "./functions";

import {
    columnTitles,
    fieldsName,
    itemsPerPageOptions,
    paginationPagesCount,
} from "./config";

export default class PackagesTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageNumber: 1,
            itemsPerPage: itemsPerPageOptions[0].value,

            currentPagePackages: [],

            searchFieldValue: "",
        };

        this.blackmagic = new Blackmagic();

        this.packagesNumber = 0;
        this.totalPages = 0;

        this.onItemsPerPageChange = this.onItemsPerPageChange.bind(this);
        this.onPackageActionClick = this.onPackageActionClick.bind(this);
        this.onPackageSearch = this.onPackageSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);

        // Bind render methods
        this.getCardTitle = this.getCardTitle.bind(this);
        this.getCardTools = this.getCardTools.bind(this);
        this.getCardFooter = this.getCardFooter.bind(this);
    }

    componentDidMount() {
        const { currentPageNumber, itemsPerPage } = this.state;
        this.blackmagic.fetchPackagesNumber()
            .then((number) => {
                this.packagesNumber = number;
                this.totalPages = Math.ceil(number / itemsPerPage);
            });

        this.blackmagic.fetchPackagesList(currentPageNumber, itemsPerPage)
            .then((currentPagePackages) => {
                this.setState(() => ({ currentPagePackages }));
            });
    }

    componentDidUpdate(_prevProps, prevState) {
        const { currentPageNumber, itemsPerPage } = this.state;
        if (prevState.currentPageNumber !== currentPageNumber
            || prevState.itemsPerPage !== itemsPerPage) {
            this.blackmagic.fetchPackagesList(currentPageNumber, itemsPerPage)
                .then((currentPagePackages) => {
                    this.setState({ currentPagePackages });
                });
        }
    }

    onItemsPerPageChange(itemsPerPage) {
        this.setState(() => ({
            itemsPerPage: parseInt(itemsPerPage, 10),
        }));
    }

    onPageChange(currentPageNumber) {
        this.setState(() => ({ currentPageNumber }));
    }

    onPackageSearch() {
        const { searchFieldValue } = this.state;
        this.blackmagic.searchPackages(searchFieldValue)
            .then((list) => {
                console.log("search res", list);
            });
    }

    onSearchFieldChange(fieldName, searchFieldValue) {
        this.setState(() => ({ searchFieldValue }));
    }

    onPackageActionClick(event) {
        const packageName = event.target.dataset.package;
        const { action } = event.target.dataset;
        const { resolvePackage } = this.props;
        resolvePackage(packageName, action);
    }

    /*
        Render methods
    */

    getCardTitle() {
        return (
            <div>
                Show
                <Select styleName="form-control-sm" options={itemsPerPageOptions} onChange={this.onItemsPerPageChange} />
                packages
            </div>
        );
    }

    getCardTools() {
        return (
            <InputGroup
                styleName="input-group-sm"
                appendComponent={(
                    <button type="button" className="btn btn-default" onClick={this.onPackageSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                )}
            >
                <Input
                    type="text"
                    name="package-search"
                    placeholder="Package name"
                    onChange={this.onSearchFieldChange}
                />
            </InputGroup>
        );
    }

    getCardFooter() {
        const { currentPageNumber, itemsPerPage } = this.state;
        const packagesStartNumber = (currentPageNumber - 1) * itemsPerPage + 1;
        const packagesEndNumber = currentPageNumber * itemsPerPage;

        return [
            <div className="float-left" key="packagesCount">
                {/* eslint-disable-next-line react/jsx-one-expression-per-line, max-len */}
                Showing {packagesStartNumber} to {packagesEndNumber} of {spaceSeparation(this.packagesNumber)} packages
            </div>,
            <div className="float-right" key="pagination">
                <Pagination
                    paginationPagesCount={paginationPagesCount}
                    totalPages={this.totalPages}
                    currentPageNumber={currentPageNumber}
                    onChange={this.onPageChange}
                />
            </div>,
        ];
    }

    render() {
        const { currentPagePackages } = this.state;
        const { packages } = this.props;
        return (
            <Card
                additionalClasses="packages-table-card"
                title={this.getCardTitle()}
                tools={this.getCardTools()}
                footer={this.getCardFooter()}
            >
                <Table bsPrefix="table table-responsive border-top-0">
                    <thead>
                        <tr>
                            {columnTitles.map((title) => (
                                <th id={title} key={title}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPagePackages.map((item) => (
                            prepareTableItem(item, packages, this.onPackageActionClick)
                        )).map((packageObj) => {
                            const trKey = packageObj.package;
                            return (
                                <tr key={trKey}>
                                    {fieldsName.map((field) => (
                                        <td id={field} key={field}>{packageObj[field]}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card>
        );
    }
}

PackagesTable.propTypes = {
    packages: PropTypes.shape({
        base: PropTypes.array,
        selected: PropTypes.array,
        dependent: PropTypes.array,
    }),
    resolvePackage: PropTypes.func.isRequired,
};

PackagesTable.defaultProps = {
    packages: {
        base: [],
        selected: [],
        dependent: [],
    },
};
