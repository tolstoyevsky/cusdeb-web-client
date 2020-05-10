import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
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

            selectedPackages: [],
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
        const { fetchPackagesFunc, fetchPackagesNumberFunc } = this.props;
        fetchPackagesNumberFunc()
            .then((number) => {
                this.packagesNumber = number;
                this.totalPages = Math.ceil(number / itemsPerPage);
            });
        fetchPackagesFunc(currentPageNumber, itemsPerPage)
            .then((currentPagePackages) => {
                this.setState(() => ({ currentPagePackages }));
            });
    }

    componentDidUpdate(_prevProps, prevState) {
        const { currentPageNumber, itemsPerPage } = this.state;
        const { fetchPackagesFunc } = this.props;
        if (prevState.currentPageNumber !== currentPageNumber
            || prevState.itemsPerPage !== itemsPerPage) {
            fetchPackagesFunc(currentPageNumber, itemsPerPage)
                .then((currentPagePackages) => {
                    console.log(currentPagePackages);
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
            .then(() => {
                this.setState((prevState) => {
                    // eslint-disable-next-line no-shadow
                    const { resolvingPackages } = prevState;

                    const resolvingPackageIndex = resolvingPackages.indexOf(packageName);
                    resolvingPackages.splice(resolvingPackageIndex, 1);

                    return {
                        resolvingPackages,
                    };
                });
            });
    }

    prepareTableItem(_packageObj) {
        const { resolvingPackages } = this.state;
        const { allowAction } = this.props;
        const packageObj = { ..._packageObj };
        const packageName = packageObj.package;

        packageObj.package = [
            <span key="packageNme">{packageName}</span>,
        ];

        const badge = PackagesTable.getBadgeByPackageType(packageObj.type);
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

        if (allowAction && packageObj.type !== "base" && packageObj.type !== "dependent") {
            packageObj.action = (
                <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.onPackageActionClick}
                    data-action={packageObj.type === "selected" ? "remove" : "add"}
                    data-package={packageName}
                >
                    {packageObj.type === "selected" ? "-" : "+"}
                </button>
            );
        }

        packageObj.size = formatBytes(packageObj.size);

        return packageObj;
    }

    render() {
        const { currentPagePackages } = this.state;
        const { allowAction } = this.props;

        const columnTitlesCopy = [...columnTitles];
        const fieldsNameCopy = [...fieldsName];
        if (!allowAction) {
            columnTitlesCopy.shift();
            fieldsNameCopy.shift();
        }

        return (
            <Card className="packages-table-card mb-0 rounded-0 shadow-0">
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
                            <div className="card-tools m-0">
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
                                {columnTitlesCopy.map((title) => (
                                    <th className={title} key={title}>{title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentPagePackages.map((packageObj) => {
                                const preparedPackageObj = this.prepareTableItem(packageObj);
                                return (
                                    <tr key={packageObj.package}>
                                        {fieldsNameCopy.map((field) => (
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

PackagesTable.propTypes = {
    allowAction: PropTypes.bool,
    fetchPackagesFunc: PropTypes.func.isRequired,
    fetchPackagesNumberFunc: PropTypes.func.isRequired,
};

PackagesTable.defaultProps = {
    allowAction: true,
};
