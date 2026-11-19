# Zalex Employee Certification Solution

A React-based web application developed as part of a frontend technical assessment. The application allows employees to submit certificate requests and view existing requests through an external REST API.

## Features

### Request Certificate

- Submit certificate requests using a structured form.
- Client-side validation with inline error messages.
- Required alphanumeric **Address To** field.
- **Purpose** field with a minimum length of 50 characters.
- **Issued On** date restricted to future dates.
- Numeric-only **Employee ID** field.
- Loading, success, and error feedback during submission.
- Form reset after successful submission.

### Certificate Requests

- Display existing certificate requests in a table.
- Filter by reference number, recipient address, and status.
- Sort by issued date or status in ascending and descending order.
- Combine multiple filters with sorting.
- Handle loading, API errors, and empty results.
- Responsive layout for different screen sizes.

## Tech Stack

- **React** — Component-based user interface
- **Vite** — Development server and build tooling
- **JavaScript (ES6+)** — Application logic
- **React Router** — Client-side navigation
- **Axios** — HTTP requests and API integration
- **CSS** — Responsive styling
- **Vitest** — Unit testing
- **ESLint** — Code quality and linting

## Getting Started

### Prerequisites

- Node.js compatible with the project's Vite version
- npm
- Valid API subscription key for the provided certification API

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/and-neo/zalex-certification.git
cd zalex-certification
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://apim-interviews-prod.azure-api.net
VITE_API_SUBSCRIPTION_KEY=your_subscription_key_here
```

Replace the placeholder with a valid subscription key.

**4. Start the development server**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Generate a production build          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint checks                    |
| `npm test`        | Run unit tests with Vitest           |

## API Integration

The application communicates with the certification API using two endpoints:

| Method | Endpoint               | Purpose                                |
| ------ | ---------------------- | -------------------------------------- |
| GET    | `/request-list`        | Retrieve existing certificate requests |
| POST   | `/request-certificate` | Submit a new certificate request       |

API requests are managed through a shared Axios instance in `src/services/certificateService.js`.

The application handles unsuccessful requests and displays appropriate feedback to users.

**Security note:** This edition uses client-side environment variables to access the assessment API. Vite exposes `VITE_` variables to the browser, so the subscription key is not protected at runtime. This implementation is intended for local assessment and demonstration only. A publicly deployed production version should use a server-side proxy to protect API credentials.

## Project Structure

```text
src/
├── assets/
├── components/       # Reusable UI and certificate components
├── layouts/          # Shared page layouts
├── pages/            # Application pages
├── routes/           # Client-side routing
├── services/         # API communication
├── styles/           # Application styles
├── utils/            # Validation, date utilities, and tests
└── main.jsx          # Application entry point
```

## Validation and Data Handling

Form validation is implemented through reusable utility functions, separate from UI components.

The certificate requests page uses React state and memoization to manage filtering and sorting. Date values returned by the API are parsed before comparison, and sorting is performed without mutating the original dataset.

## Testing

Unit tests cover:

- Certificate form validation rules
- Date parsing and comparison utilities

Run the test suite:

```bash
npm test
```

## Implementation Notes

- Form fields use controlled React inputs.
- Validation feedback is displayed inline.
- API communication is separated from presentation components.
- Filtering and sorting are performed client-side.
- Asynchronous operations include loading and error handling.
- The application uses semantic HTML and accessibility attributes where appropriate.

## Assessment Context

Developed as a frontend technical assessment using React, with an emphasis on component organization, form validation, REST API integration, data presentation, and maintainable code.
