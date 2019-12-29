import React from "react";
import PropTypes from "prop-types";

const Table = props => (
    <table className="table">
        <thead>
            <tr>
                {props.columnTitles.map((title, index) => (
                    <th key={index}>{title}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {props.children.map((packageObj, index) => (
                <tr key={index}>
                    {props.fieldsName.map((field, fieldIndex) => (
                        <td key={fieldIndex}>{packageObj[field]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
)

Table.propTypes = {
    columnTitles: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
        ])
    ),
    fieldsName: PropTypes.arrayOf(PropTypes.string),
}

Table.defaultProps = {
    columnTitles: [],
    fieldsName: [],
}

export default Table;
