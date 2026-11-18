import { useState } from "react";
import CertificateForm from "../components/certificates/CertificateForm";
import { requestCertificate } from "../services/certificateService";

function RequestCertificate() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitError, setSubmitError] = useState("");
    const [formVersion, setFormVersion] = useState(0);

    /**
     * Resets the form and clears the submission feedback.
     * Changing the form key creates a fresh form instance.
     */
    const handleClearForm = () => {
        setFormVersion((prevVersion) => prevVersion + 1);
        clearSubmitFeedback();
    };

    const clearSubmitFeedback = () => {
        setSubmitStatus(null);
        setSubmitError("");
    };

    const handleCertificateSubmit = async (formData) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        clearSubmitFeedback();

        try {
            const response = await requestCertificate(formData);

            // The provided API uses "responce" instead of "response".
            if (response?.responce !== "Ok") {
                throw new Error("Unexpected API response.");
            }

            setSubmitStatus("success");
        } catch (error) {
            console.error("Certificate request failed:", error);

            setSubmitStatus("error");
            setSubmitError("Unable to submit your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="page">
            <h1>Request Certificate</h1>
            <p>Submit a new employment certificate request.</p>

            <CertificateForm
                key={formVersion}
                onSubmit={handleCertificateSubmit}
                onChange={clearSubmitFeedback}
                onClear={handleClearForm}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                submitError={submitError}
            />
        </section>
    );
}

export default RequestCertificate;
