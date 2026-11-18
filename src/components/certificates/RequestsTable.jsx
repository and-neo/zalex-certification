import "./RequestsTable.css";

function RequestsTable({ requests, sortConfig, onSort }) {
    if (requests.length === 0) {
        return <p>No certificate requests found.</p>;
    }

    return (
        <div className="table-container">
            <table className="requests-table">
                <thead>
                    <tr>
                        <th scope="col">Reference No.</th>
                        <th scope="col">Address to</th>
                        <th scope="col">Purpose</th>

                        <th
                            scope="col"
                            aria-sort={
                                sortConfig.key === "issued_on"
                                    ? sortConfig.direction === "asc"
                                        ? "ascending"
                                        : "descending"
                                    : "none"
                            }
                        >
                            <button
                                type="button"
                                className="sort-button"
                                onClick={() => onSort("issued_on")}
                            >
                                Issued on
                                <span aria-hidden="true">
                                    {sortConfig.key === "issued_on"
                                        ? sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓"
                                        : " ↕"}
                                </span>
                            </button>
                        </th>

                        <th
                            scope="col"
                            aria-sort={
                                sortConfig.key === "status"
                                    ? sortConfig.direction === "asc"
                                        ? "ascending"
                                        : "descending"
                                    : "none"
                            }
                        >
                            <button
                                type="button"
                                className="sort-button"
                                onClick={() => onSort("status")}
                            >
                                Status
                                <span aria-hidden="true">
                                    {sortConfig.key === "status"
                                        ? sortConfig.direction === "asc"
                                            ? " ↑"
                                            : " ↓"
                                        : " ↕"}
                                </span>
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {requests.map((request) => (
                        <tr key={request._clientId}>
                            <td>{request.reference_no}</td>
                            <td>{request.address_to}</td>
                            <td>{request.purpose}</td>
                            <td>{request.issued_on}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RequestsTable;
