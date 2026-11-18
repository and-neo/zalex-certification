import { useEffect, useMemo, useState } from "react";
import { getCertificateRequests } from "../services/certificateService";
import RequestsTable from "../components/certificates/RequestsTable";
import RequestsFilters from "../components/certificates/RequestsFilters";
import { parseCertificateDate } from "../utils/certificateUtils";

const initialFilters = {
    reference_no: "",
    address_to: "",
    status: "",
};

function RequestsList() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const [filters, setFilters] = useState(initialFilters);

    /**
     * Toggles the sorting direction when the same column is selected.
     * A newly selected column starts in ascending order.
     */
    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction:
                prevConfig.key === key && prevConfig.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    /**
     * Updates a single filter while preserving the remaining values.
     */
    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    /**
     * Resets all filters to their initial values.
     */
    const clearFilters = () => {
        setFilters(initialFilters);
    };

    /**
     * Filters the API data and sorts the matching records.
     * The original requests array remains unchanged.
     */
    const displayedRequests = useMemo(() => {
        const filteredRequests = requests.filter((request) => {
            const matchesReference =
                !filters.reference_no.trim() ||
                String(request.reference_no) === filters.reference_no.trim();

            const matchesAddress = request.address_to
                .toLowerCase()
                .includes(filters.address_to.trim().toLowerCase());

            const matchesStatus =
                !filters.status || request.status === filters.status;

            return matchesReference && matchesAddress && matchesStatus;
        });

        if (!sortConfig.key) {
            return filteredRequests;
        }

        return [...filteredRequests].sort((a, b) => {
            let comparison = 0;

            if (sortConfig.key === "issued_on") {
                comparison =
                    parseCertificateDate(a.issued_on) -
                    parseCertificateDate(b.issued_on);
            }

            if (sortConfig.key === "status") {
                comparison = a.status.localeCompare(b.status);
            }

            return sortConfig.direction === "asc" ? comparison : -comparison;
        });
    }, [requests, filters, sortConfig]);

    useEffect(() => {
        let isActive = true;

        const fetchRequests = async () => {
            try {
                const data = await getCertificateRequests();

                if (isActive) {
                    // Assign a stable client-side key to each fetched record.
                    const requestsWithIds = data.map((request, index) => ({
                        ...request,
                        _clientId: index,
                    }));

                    setRequests(requestsWithIds);
                }
            } catch (error) {
                console.error("Failed to fetch certificate requests:", error);

                if (isActive) {
                    setError("Unable to load certificate requests.");
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        fetchRequests();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <section className="page">
            <h1>Certificate Requests</h1>
            <p>View and manage existing certificate requests.</p>

            {isLoading && <p role="status">Loading requests...</p>}

            {!isLoading && error && (
                <p className="form-error" role="alert">
                    {error}
                </p>
            )}

            {!isLoading && !error && (
                <>
                    <RequestsFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClear={clearFilters}
                    />

                    <p className="results-count">
                        Showing {displayedRequests.length} of {requests.length}{" "}
                        requests
                    </p>

                    <RequestsTable
                        requests={displayedRequests}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        isStatusFiltered={Boolean(filters.status)}
                    />
                </>
            )}
        </section>
    );
}

export default RequestsList;
