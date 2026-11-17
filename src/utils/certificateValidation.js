/**
 * Validates certificate request fields.
 * Returns an object containing errors for invalid fields.
 */
export function validateCertificate(formData) {
    const errors = {};

    const address = formData.address_to.trim();
    const purpose = formData.purpose.trim();
    const employeeId = formData.employee_id.trim();

    // Address must contain letters, numbers or spaces.
    const addressPattern = /^[\p{L}\p{N}\s]+$/u;

    if (!address) {
        errors.address_to = "Address is required.";
    } else if (!addressPattern.test(address)) {
        errors.address_to =
            "Address must contain letters, numbers or spaces only.";
    }

    // Purpose must contain at least 50 characters.
    if (!purpose) {
        errors.purpose = "Purpose is required.";
    } else if (purpose.length < 50) {
        errors.purpose = "Purpose must contain at least 50 characters.";
    }

    // The selected date must be strictly after today.
    if (!formData.issued_on) {
        errors.issued_on = "Issued on date is required.";
    } else if (formData.issued_on < getTomorrowDate()) {
        errors.issued_on = "Please select a future date.";
    }

    // Employee ID must contain digits only.
    if (!employeeId) {
        errors.employee_id = "Employee ID is required.";
    } else if (!/^\d+$/.test(employeeId)) {
        errors.employee_id = "Employee ID must contain numbers only.";
    }

    return errors;
}

/**
 * Returns tomorrow's date in local YYYY-MM-DD format.
 * Used as the earliest valid certificate issue date.
 */
export function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
