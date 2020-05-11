import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    InputGroup,
    Spinner,
    Table,
} from "react-bootstrap";

import Input from "common/components/Input";
import Select from "common/components/Select";

import Blackmagic from "api/rpc/blackmagic";
import { formatBytes, spaceSeparation } from "utils/filters";

import Pagination from "./components/Pagination/Pagination";
import {
    columnTitles,
    fieldsName,
    itemsPerPageOptions,
    paginationPagesCount,
} from "./config";

export default class PackagesTable extends Component {
    static getBadgeByPackageType(packageType) {
        if (packageType === "base") {
            return <span className="badge bg-warning">Base</span>;
        }
        if (packageType === "selected") {
            return <span className="badge bg-success">Selected</span>;
        }
        if (packageType === "dependent") {
            return <span className="badge bg-danger">Dependent</span>;
        }

        return "";
    }

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
            resolvingPackages: [],
        };

        this.blackmagic = new Blackmagic();

        this.packagesNumber = 0;
        this.totalPages = 0;

        this.onItemsPerPageChange = this.onItemsPerPageChange.bind(this);
        this.onPackageActionClick = this.onPackageActionClick.bind(this);
        this.onPackageSearch = this.onPackageSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
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

        return (
            <div className="row">
                <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                    <div className="text-center text-sm-left" key="packagesCount">
                        {/* eslint-disable-next-line react/jsx-one-expression-per-line, max-len */}
                        Showing {packagesStartNumber} to {packagesEndNumber} of {spaceSeparation(this.packagesNumber)} packages
                    </div>
                </div>
                <div className="col-12 col-sm-6 d-inline-flex justify-content-sm-end justify-content-center">
                    <div key="pagination">
                        <Pagination
                            paginationPagesCount={paginationPagesCount}
                            totalPages={this.totalPages}
                            onChange={this.onPageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    getPackageType(packageName) {
        const { basePackages, dependentPackages, selectedPackages } = this.state;

        if (basePackages.includes(packageName)) {
            return "base";
        }
        if (dependentPackages.includes(packageName)) {
            return "dependent";
        }
        if (selectedPackages.includes(packageName)) {
            return "selected";
        }

        return "unset";
    }

    resolvePackage(packageName, action) {
        const { resolvingPackages, selectedPackages } = this.state;

        resolvingPackages.push(packageName);
        if (action === "add") {
            selectedPackages.push(packageName);
        } else if (action === "remove") {
            const selectPackageIndex = selectedPackages.indexOf(packageName);
            selectedPackages.splice(selectPackageIndex, 1);
        }

        this.setState(() => ({
            resolvingPackages,
            selectedPackages,
        }));

        this.blackmagic.resolvePackages(selectedPackages)
            .then((newDependentPackages) => {
                this.setState((prevState) => {
                    // eslint-disable-next-line no-shadow
                    const { dependentPackages, resolvingPackages } = prevState;

                    const resolvingPackageIndex = resolvingPackages.indexOf(packageName);
                    resolvingPackages.splice(resolvingPackageIndex, 1);

                    return {
                        dependentPackages: dependentPackages.concat(newDependentPackages),
                        resolvingPackages,
                    };
                });
            });
    }

    prepareTableItem(_packageObj) {
        const { resolvingPackages } = this.state;
        const packageObj = { ..._packageObj };
        const packageName = packageObj.package;

        packageObj.package = [
            <span key="packageNme">{packageName}</span>,
        ];

        const packageType = this.getPackageType(packageName);
        const badge = PackagesTable.getBadgeByPackageType(packageType);
        if (badge && !resolvingPackages.includes(packageName)) {
            packageObj.package.push(
                <span key="badge" className="ml-1">
                    {badge}
                </span>,
            );
        }
        if (resolvingPackages.includes(packageName)) {
            packageObj.package.push(
                <Spinner
                    key="spinner"
                    className="ml-1"
                    animation="border"
                    size="sm"
                />,
            );
        }

        if (packageType !== "base" && packageType !== "dependent") {
            packageObj.action = (
                <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.onPackageActionClick}
                    data-action={packageType === "selected" ? "remove" : "add"}
                    data-package={packageName}
                >
                    {packageType === "selected" ? "-" : "+"}
                </button>
            );
        }

        packageObj.size = formatBytes(packageObj.size);

        return packageObj;
    }

    render() {
        const { currentPagePackages } = this.state;
        return (
            <Card className="packages-table-card">
                <Card.Header>
                    <div className="row">
                        <div className="col-6">
                            <Card.Title>
                                <Select
                                    styleName="form-control-sm"
                                    options={itemsPerPageOptions}
                                    onChange={this.onItemsPerPageChange}
                                />
                                rows
                            </Card.Title>
                        </div>
                        <div className="col-6 d-inline-flex justify-content-end">
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
                    <Table bsPrefix="table table-responsive-sm border-top-0">
                        <thead>
                            <tr>
                                {columnTitles.map((title) => (
                                    <th className={title} key={title}>{title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentPagePackages.map((packageObj) => {
                                const preparedPackageObj = this.prepareTableItem(packageObj);
                                return (
                                    <tr key={packageObj.package}>
                                        {fieldsName.map((field) => (
                                            <td className={field} key={field}>
                                                {preparedPackageObj[field]}
                                            </td>
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
