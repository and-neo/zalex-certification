import "./RequestsFilters.css";

/**
 * Displays filtering controls for the requests list.
 * Filter values are controlled by the parent component.
 */
function RequestsFilters({ filters, onFilterChange, onClear }) {
    return (
        <div className="requests-filters">
            <div className="filter-group">
                <label htmlFor="filter-reference">Reference No.</label>
                <input
                    id="filter-reference"
                    type="text"
                    inputMode="numeric"
                    placeholder="Search reference..."
                    value={filters.reference_no}
                    onChange={(event) =>
                        onFilterChange("reference_no", event.target.value)
                    }
                />
            </div>

            <div className="filter-group">
                <label htmlFor="filter-address">Address to</label>
                <input
                    id="filter-address"
                    type="text"
                    placeholder="Search address..."
                    value={filters.address_to}
                    onChange={(event) =>
                        onFilterChange("address_to", event.target.value)
                    }
                />
            </div>

            <div className="filter-group">
                <label htmlFor="filter-status">Status</label>
                <select
                    id="filter-status"
                    value={filters.status}
                    onChange={(event) =>
                        onFilterChange("status", event.target.value)
                    }
                >
                    <option value="">All statuses</option>
                    <option value="New">New</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <button
                type="button"
                className="clear-filters-button"
                onClick={onClear}
            >
                Clear Filters
            </button>
        </div>
    );
}

export default RequestsFilters;
