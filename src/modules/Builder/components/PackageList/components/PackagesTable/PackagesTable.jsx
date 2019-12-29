import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Card from "common/containers/Card";
import Input from "common/components/Input";
import Table from "common/components/Table";
import Select from "common/components/Select";
import InputGroup from "common/components/InputGroup";

import * as RPC from "api/rpc/blackmagic";

import Pagination from "./components/Pagination/Pagination";
import prepareTableItem from "./functions";

import {
    columnTitles,
    fieldsName,
    itemsPerPageOptions,
    paginationPagesCount,
} from "./config";

export default class PackagesTable extends Component {
    static propTypes = {
        packages: PropTypes.shape({
            base: PropTypes.array,
            selected: PropTypes.array,
            dependent: PropTypes.array,
        }),
        resolvePackage: PropTypes.func,
    }

    static defaultProps = {
        packages: {
            base: [],
            selected: [],
            dependent: [],
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            currentPageNumber: 1,
            itemsPerPage: itemsPerPageOptions[0].value,

            currentPagePackages: [],

            searchFieldValue: "",
        };

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
        RPC.fetchPackagesNumber()
            .then(number => {
                this.packagesNumber = number;
                this.totalPages = Math.ceil(number / this.state.itemsPerPage);
            });

        RPC.fetchPackagesList(this.state.currentPageNumber, this.state.itemsPerPage)
            .then(currentPagePackages => {
                this.setState(() => ({ currentPagePackages }));
            });
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.currentPageNumber !== this.state.currentPageNumber || prevState.itemsPerPage !== this.state.itemsPerPage) {
            RPC.fetchPackagesList(this.state.currentPageNumber, this.state.itemsPerPage)
                .then(currentPagePackages => {
                    this.setState({ currentPagePackages });
                });
        }
    }

    onItemsPerPageChange(itemsPerPage) {
        itemsPerPage = parseInt(itemsPerPage);
        this.setState(() => ({ itemsPerPage }));
    }

    onPageChange(currentPageNumber) {
        this.setState(() => ({ currentPageNumber }));
    }

    onPackageSearch() {
        RPC.searchPackages(this.state.searchFieldValue)
            .then(list => {
                console.log('search res', list)
            });
    }

    onSearchFieldChange(fieldName, searchFieldValue) {
        this.setState(() => ({ searchFieldValue }));
    }

    onPackageActionClick(event) {
        let packageName = event.target.dataset.package;
        let action = event.target.dataset.action;
        this.props.resolvePackage(packageName, action);
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
        )
    }

    getCardTools() {
        return (
            <InputGroup
                styleName="input-group-sm"
                appendComponent={
                    <button className="btn btn-default" onClick={this.onPackageSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                }>
                <Input
                    type="text"
                    name="package-search"
                    placeholder="Package name"
                    onChange={this.onSearchFieldChange} />
            </InputGroup>
        )
    }

    getCardFooter() {
        let packagesStartNumber = (this.state.currentPageNumber - 1) * this.state.itemsPerPage + 1;
        let packagesEndNumber = this.state.currentPageNumber * this.state.itemsPerPage;

        return [
            <div className="float-left" key="packagesCount">
                Showing {packagesStartNumber} to {packagesEndNumber} of {this.packagesNumber} packages
            </div>,
            <div className="float-right" key="pagination">
                <Pagination
                    paginationPagesCount={paginationPagesCount}
                    totalPages={this.totalPages}
                    currentPageNumber={this.state.currentPageNumber}
                    onChange={this.onPageChange} />
            </div>
        ]
    }

    render() {
        return (
            <Card title={this.getCardTitle()} tools={this.getCardTools()} footer={this.getCardFooter()}>
                <Table columnTitles={columnTitles} fieldsName={fieldsName}>
                    {this.state.currentPagePackages.map(item =>
                        prepareTableItem(item, this.props.packages, this.onPackageActionClick)
                    )}
                </Table>
            </Card>
        );
    }
}
