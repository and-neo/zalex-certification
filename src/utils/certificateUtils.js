/**
 * Converts an API date in M/D/YYYY format to a timestamp
 * so requests can be sorted chronologically.
 */
export function parseCertificateDate(dateString) {
    const [month, day, year] = dateString.split("/").map(Number);

    return new Date(year, month - 1, day).getTime();
}
