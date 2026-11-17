import { useState } from "react";
import CertificateForm from "../components/certificates/CertificateForm";
import { requestCertificate } from "../services/certificateService";

function RequestCertificate() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitError, setSubmitError] = useState("");

    const clearSubmitFeedback = () => {
        setSubmitStatus(null);
        setSubmitError("");
    };

    const handleCertificateSubmit = async (formData) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitError("");

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
                onSubmit={handleCertificateSubmit}
                onChange={clearSubmitFeedback}
                isSubmitting={isSubmitting}
            />

            {submitStatus === "success" && (
                <p className="form-success" role="status">
                    Your certificate request has been submitted successfully.
                </p>
            )}

            {submitStatus === "error" && (
                <p className="form-error" role="alert">
                    {submitError}
                </p>
            )}
        </section>
    );
}

export default RequestCertificate;
