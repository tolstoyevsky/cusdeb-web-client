import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    InputGroup,
    Table,
} from "react-bootstrap";

import Input from "common/components/Input";
import Select from "common/components/Select";

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

            basePackages: [],
            selectedPackages: [],
            dependentPackages: [],
        };

        this.blackmagic = new Blackmagic();

        this.packagesNumber = 0;
        this.totalPages = 0;

        this.onItemsPerPageChange = this.onItemsPerPageChange.bind(this);
        this.onPackageActionClick = this.onPackageActionClick.bind(this);
        this.onPackageSearch = this.onPackageSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
        this.resolvePackage = this.resolvePackage.bind(this);
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
        this.blackmagic.fetchBasePackagesList()
            .then((basePackages) => {
                this.setState(() => ({ basePackages }));
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
        this.resolvePackage(packageName, action);
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

    resolvePackage(packageName, action) {
        const { selectedPackages } = this.state;
        const newSelectedPackages = [...selectedPackages];

        if (action === "add") {
            newSelectedPackages.push(packageName);
        } else if (action === "remove") {
            newSelectedPackages.pop(packageName);
        }

        this.setState(() => ({
            selectedPackages: newSelectedPackages,
        }));

        this.blackmagic.resolvePackages(newSelectedPackages)
            .then((dependentPackages) => {
                this.setState(() => ({ dependentPackages }));
            });
    }

    render() {
        const {
            currentPagePackages,
            basePackages,
            selectedPackages,
            dependentPackages,
        } = this.state;
        const packages = {
            base: basePackages,
            selected: selectedPackages,
            dependent: dependentPackages,
        };

        return (
            <Card className="packages-table-card">
                <Card.Header>
                    <div className="row">
                        <div className="col-sm-12 col-md-9">
                            <Card.Title>
                                Show
                                <Select
                                    styleName="form-control-sm"
                                    options={itemsPerPageOptions}
                                    onChange={this.onItemsPerPageChange}
                                />
                                packages
                            </Card.Title>
                        </div>
                        <div className="col-sm-12 col-md-3 d-inline-flex justify-content-end">
                            <div className="card-tools">
                                <InputGroup size="sm">
                                    <Input
                                        type="text"
                                        name="package-search"
                                        placeholder="Package name"
                                        onChange={this.onSearchFieldChange}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="default" onClick={this.onPackageSearch}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
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
                </Card.Body>
                <Card.Footer>
                    {this.getCardFooter()}
                </Card.Footer>
            </Card>
        );
    }
}
