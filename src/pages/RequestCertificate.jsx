import CertificateForm from "../components/certificates/CertificateForm";

function RequestCertificate() {
    return (
        <section className="page">
            <h1>Request Certificate</h1>
            <p>Submit a new employment certificate request.</p>

            <CertificateForm />
        </section>
    );
}

export default RequestCertificate;
