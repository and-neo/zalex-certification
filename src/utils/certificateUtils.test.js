import { describe, expect, it } from "vitest";
import { parseCertificateDate } from "./certificateUtils";

describe("parseCertificateDate", () => {
    it("converts an API date to the correct timestamp", () => {
        const result = parseCertificateDate("6/16/2023");

        expect(result).toBe(new Date(2023, 5, 16).getTime());
    });

    it("supports single-digit months and days", () => {
        const result = parseCertificateDate("7/2/2023");

        expect(result).toBe(new Date(2023, 6, 2).getTime());
    });

    it("sorts dates chronologically in ascending order", () => {
        const dates = ["10/1/2023", "12/9/2022", "6/16/2023", "2/28/2023"];

        const sortedDates = [...dates].sort(
            (a, b) => parseCertificateDate(a) - parseCertificateDate(b),
        );

        expect(sortedDates).toEqual([
            "12/9/2022",
            "2/28/2023",
            "6/16/2023",
            "10/1/2023",
        ]);
    });

    it("sorts dates chronologically in descending order", () => {
        const dates = ["10/1/2023", "12/9/2022", "6/16/2023", "2/28/2023"];

        const sortedDates = [...dates].sort(
            (a, b) => parseCertificateDate(b) - parseCertificateDate(a),
        );

        expect(sortedDates).toEqual([
            "10/1/2023",
            "6/16/2023",
            "2/28/2023",
            "12/9/2022",
        ]);
    });
});
