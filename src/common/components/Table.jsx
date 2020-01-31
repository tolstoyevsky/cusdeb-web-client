import React from "react";
import PropTypes from "prop-types";

const Table = ({
    children, columnTitles, fieldsName,
}) => (
    <table className="table">
        <thead>
            <tr>
                {columnTitles.map((title) => (
                    <th key={title}>{title}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {children.map((packageObj, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={index}>
                    {fieldsName.map((field) => (
                        <td key={field}>{packageObj[field]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

Table.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
    columnTitles: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
        ]),
    ),
    fieldsName: PropTypes.arrayOf(PropTypes.string),
};

Table.defaultProps = {
    children: [],
    columnTitles: [],
    fieldsName: [],
};

export default Table;
