import "./CertificateForm.css";

import { useState } from "react";
import {
    validateCertificate,
    getTomorrowDate,
} from "../../utils/certificateValidation";

const initialFormData = {
    address_to: "",
    purpose: "",
    issued_on: "",
    employee_id: "",
};

function CertificateForm({ onSubmit, onChange, isSubmitting }) {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        const updatedFormData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedFormData);
        onChange?.();

        // Validate again only after the field has been touched.
        if (touched[name]) {
            const validationErrors = validateCertificate(updatedFormData);

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: validationErrors[name],
            }));
        }
    };

    const handleBlur = (event) => {
        const { name } = event.target;

        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));

        const validationErrors = validateCertificate(formData);

        // Update only the error of the field that lost focus.
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationErrors[name],
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateCertificate(formData);

        setErrors(validationErrors);

        setTouched({
            address_to: true,
            purpose: true,
            issued_on: true,
            employee_id: true,
        });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // Pass validated data to the parent page.
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <label htmlFor="address_to">Address to *</label>
                <textarea
                    id="address_to"
                    name="address_to"
                    value={formData.address_to}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={2}
                    aria-invalid={Boolean(
                        touched.address_to && errors.address_to,
                    )}
                    aria-describedby={
                        touched.address_to && errors.address_to
                            ? "address-error"
                            : undefined
                    }
                    disabled={isSubmitting}
                />
                {touched.address_to && errors.address_to && (
                    <p className="field-error" id="address-error">
                        {errors.address_to}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="purpose">Purpose *</label>
                <textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    aria-invalid={Boolean(touched.purpose && errors.purpose)}
                    aria-describedby={
                        touched.purpose && errors.purpose
                            ? "purpose-error"
                            : undefined
                    }
                    disabled={isSubmitting}
                />
                <div className="field-meta">
                    <span>Minimum 50 characters</span>
                    <span>{formData.purpose.trim().length}/50</span>
                </div>
                {touched.purpose && errors.purpose && (
                    <p className="field-error" id="purpose-error">
                        {errors.purpose}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="issued_on">Issued on *</label>
                <input
                    type="date"
                    id="issued_on"
                    name="issued_on"
                    min={getTomorrowDate()}
                    value={formData.issued_on}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(
                        touched.issued_on && errors.issued_on,
                    )}
                    aria-describedby={
                        touched.issued_on && errors.issued_on
                            ? "date-error"
                            : undefined
                    }
                    disabled={isSubmitting}
                />
                {touched.issued_on && errors.issued_on && (
                    <p className="field-error" id="date-error">
                        {errors.issued_on}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="employee_id">Employee ID *</label>
                <input
                    type="text"
                    id="employee_id"
                    name="employee_id"
                    inputMode="numeric"
                    value={formData.employee_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(
                        touched.employee_id && errors.employee_id,
                    )}
                    aria-describedby={
                        touched.employee_id && errors.employee_id
                            ? "employee-error"
                            : undefined
                    }
                    disabled={isSubmitting}
                />
                {touched.employee_id && errors.employee_id && (
                    <p className="field-error" id="employee-error">
                        {errors.employee_id}
                    </p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
        </form>
    );
}

export default CertificateForm;
