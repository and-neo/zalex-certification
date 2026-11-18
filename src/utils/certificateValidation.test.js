import { describe, expect, it } from "vitest";
import { validateCertificate, getTomorrowDate } from "./certificateValidation";

const validCertificate = {
    address_to: "Embassy of Cyprus",
    purpose:
        "I need an employment certificate for my official visa application.",
    issued_on: getTomorrowDate(),
    employee_id: "12345",
};

describe("validateCertificate", () => {
    it("accepts valid certificate data", () => {
        const errors = validateCertificate(validCertificate);

        expect(errors).toEqual({});
    });

    it("requires all fields", () => {
        const errors = validateCertificate({
            address_to: "",
            purpose: "",
            issued_on: "",
            employee_id: "",
        });

        expect(errors).toHaveProperty("address_to");
        expect(errors).toHaveProperty("purpose");
        expect(errors).toHaveProperty("issued_on");
        expect(errors).toHaveProperty("employee_id");
    });

    it("rejects invalid address characters", () => {
        const errors = validateCertificate({
            ...validCertificate,
            address_to: "Embassy #1",
        });

        expect(errors).toHaveProperty("address_to");
    });

    it("requires at least 50 purpose characters", () => {
        const errors = validateCertificate({
            ...validCertificate,
            purpose: "Short purpose",
        });

        expect(errors).toHaveProperty("purpose");
    });

    it("rejects today's date", () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        const errors = validateCertificate({
            ...validCertificate,
            issued_on: `${year}-${month}-${day}`,
        });

        expect(errors).toHaveProperty("issued_on");
    });

    it("rejects non-numeric employee IDs", () => {
        const errors = validateCertificate({
            ...validCertificate,
            employee_id: "123ABC",
        });

        expect(errors).toHaveProperty("employee_id");
    });

    it("accepts employee IDs with leading zeros", () => {
        const errors = validateCertificate({
            ...validCertificate,
            employee_id: "00123",
        });

        expect(errors).toEqual({});
    });
});
