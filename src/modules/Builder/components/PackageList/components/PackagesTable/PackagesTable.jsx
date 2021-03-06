import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import {
    Card,
    InputGroup,
    Spinner,
    Table,
} from "react-bootstrap";

import Input from "common/components/Input";
import Select from "common/components/Select";

import Blackmagic from "api/rpc/blackmagic";
import { formatBytes, formatPackageDescription, spaceSeparation } from "utils/filters";

import Pagination from "./components/Pagination/Pagination";
import {
    columnTitles,
    fieldsName,
    itemsPerPageOptions,
    paginationPagesMaxCount,
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

            resolvingPackages: [],
        };

        this.blackmagic = new Blackmagic();

        this.packagesNumber = 0;
        this.totalPages = 0;

        this.onItemsPerPageChange = this.onItemsPerPageChange.bind(this);
        this.onPackageActionClick = this.onPackageActionClick.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
        this.getCardFooter = this.getCardFooter.bind(this);
    }

    componentDidMount() {
        this.fetchPackages();
    }

    componentDidUpdate(_prevProps, prevState) {
        const { currentPageNumber, itemsPerPage, searchFieldValue } = this.state;
        if (prevState.currentPageNumber !== currentPageNumber
            || prevState.itemsPerPage !== itemsPerPage
            || prevState.searchFieldValue !== searchFieldValue) {
            this.fetchPackages();
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

    onSearchFieldChange(fieldName, searchFieldValue) {
        this.setState({ searchFieldValue });

        this.fetchPackages();
    }

    onPackageActionClick(event) {
        const packageName = event.target.dataset.package;
        const { action } = event.target.dataset;
        this.resolvePackage(packageName, action);
    }

    getCardFooter() {
        const { currentPageNumber, itemsPerPage } = this.state;
        const packagesStartNumber = (currentPageNumber - 1) * itemsPerPage + 1;
        let packagesEndNumber = currentPageNumber * itemsPerPage;
        if (currentPageNumber === this.totalPages) {
            packagesEndNumber = this.packagesNumber;
        }

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
                            paginationPagesMaxCount={paginationPagesMaxCount}
                            totalPages={this.totalPages}
                            onChange={this.onPageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    fetchPackages() {
        const { currentPageNumber, itemsPerPage, searchFieldValue } = this.state;
        const { fetchPackagesFunc, fetchPackagesNumberFunc } = this.props;

        fetchPackagesNumberFunc(searchFieldValue)
            .then((number) => {
                this.packagesNumber = number;
                this.totalPages = Math.ceil(number / itemsPerPage);
            });
        fetchPackagesFunc(currentPageNumber, itemsPerPage, searchFieldValue)
            .then((currentPagePackages) => {
                this.setState({ currentPagePackages });
            });
    }

    resolvePackage(packageName, action) {
        const { resolvingPackages } = this.state;
        const { updateSelectedPackages } = this.props;
        // eslint-disable-next-line react/destructuring-assignment
        const currentSelectedPackages = this.props.selectedPackages;
        const selectedPackages = [...currentSelectedPackages];

        resolvingPackages.push(packageName);
        if (action === "add") {
            selectedPackages.push(packageName);
        } else if (action === "remove") {
            const selectPackageIndex = selectedPackages.indexOf(packageName);
            selectedPackages.splice(selectPackageIndex, 1);
        }

        this.setState(() => ({
            resolvingPackages,
        }));
        updateSelectedPackages(selectedPackages);

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

                this.fetchPackages();
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
            const { actionByDefault } = this.props;
            let action;
            if (actionByDefault) {
                action = actionByDefault;
            } else {
                action = packageObj.type === "selected" ? "remove" : "add";
            }

            packageObj.action = (
                <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.onPackageActionClick}
                    data-action={action}
                    data-package={packageName}
                >
                    {action === "add" ? "+" : "-"}
                </button>
            );
        }

        packageObj.size = formatBytes(packageObj.size);

        return packageObj;
    }

    packageLink(currentPackage) {
        const { packagesUrl, os } = this.props;

        if (!packagesUrl) {
            return null;
        }

        const link = `${packagesUrl}${currentPackage.package}`;

        if (os === "devuan-jessie-armhf") {
            return `${link}_${currentPackage.version}.html`;
        }

        return link;
    }

    render() {
        const { currentPagePackages } = this.state;
        const { allowAction, searchAvailable } = this.props;

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
                        { searchAvailable && (
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
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </div>
                        )}
                    </div>
                </Card.Header>

                {this.packagesNumber ? (
                    <>
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
                                        const preparedPackageObj = this.prepareTableItem(
                                            packageObj,
                                        );
                                        return (
                                            <tr key={packageObj.package}>
                                                {fieldsNameCopy.map((field) => {
                                                    const packageLink = this.packageLink(
                                                        packageObj,
                                                    );
                                                    if (field === "description") {
                                                        preparedPackageObj[field] = (
                                                            formatPackageDescription(
                                                                preparedPackageObj[field],
                                                                packageObj.package,
                                                            )
                                                        );
                                                    }

                                                    return (
                                                        <td className={field} key={field}>
                                                            {field === "package" && packageLink ? (
                                                                <a
                                                                    rel="noopener noreferrer"
                                                                    target="_blank"
                                                                    href={packageLink}
                                                                >
                                                                    {preparedPackageObj[field]}
                                                                </a>
                                                            ) : preparedPackageObj[field]}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            {this.getCardFooter()}
                        </Card.Footer>
                    </>
                ) : (
                    <h5 className="text-center p-4">Not found any packages</h5>
                )}
            </Card>
        );
    }
}

PackagesTable.propTypes = {
    actionByDefault: PropTypes.oneOf(["add", "remove"]),
    allowAction: PropTypes.bool,
    fetchPackagesFunc: PropTypes.func.isRequired,
    fetchPackagesNumberFunc: PropTypes.func.isRequired,
    selectedPackages: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateSelectedPackages: PropTypes.func.isRequired,
    packagesUrl: PropTypes.string,
    os: PropTypes.string,
    searchAvailable: PropTypes.bool,
};

PackagesTable.defaultProps = {
    actionByDefault: null,
    allowAction: true,
    packagesUrl: null,
    os: null,
    searchAvailable: false,
};
