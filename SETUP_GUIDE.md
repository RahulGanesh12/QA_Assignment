# QA Assignment Setup Guide

## 1. What this repository does
This project is a Playwright-based automation framework for testing both API and UI flows. It is organized around reusable helpers, page object models, fixtures, and environment-based configuration.

The repository is designed around two main automation paths:
- API testing against ReqRes endpoints
- UI testing against the SauceDemo demo application

Both paths follow a structure that keeps test logic separate from page interaction, request setup, and environment configuration.

---

## 2. Repository structure

### Root level
- package.json: defines npm scripts and project dependencies
- playwright.config.ts: Playwright runner configuration, browser setup, and default test settings
- .gitignore: ignores dependencies and suggests ignoring secrets and cookie files
- SETUP_GUIDE.md: this guide
- .github/workflows/playwright.yml: CI workflow for running tests automatically

### Main test folders
- my-qa-assignment/api: API test suite and supporting API utilities
- my-qa-assignment/ui: UI test suite and page-object implementation
- my-qa-assignment/global-utils: shared fixtures and reusable test utilities

---

## 3. How the project is organized

### API layer
The API layer is meant to keep tests simple and reusable.

Folder breakdown:
- my-qa-assignment/api/tests
  - Contains end-to-end API tests such as add-users.spec.ts and fetch-users.spec.ts
  - These tests use the shared registry and helper classes instead of building requests manually each time

- my-qa-assignment/api/builders
  - payload.builder.ts creates request payloads for test scenarios

- my-qa-assignment/api/utils/api-handler
  - apiheaders.ts: builds request headers for JSON or multipart requests
  - apiclient.ts: wraps Playwright request handling for GET/POST/PUT/DELETE calls
  - apiassertiions.ts: provides helpers for parsing responses, traversing JSON paths, checking keys, and validating status codes

- my-qa-assignment/api/utils/instance-registry
  - instance.registry.ts exposes a lazy-loaded registry for API utilities so tests can access payload builders, headers, client, and assertions without manual instantiation

- my-qa-assignment/api/utils/base-urls
  - base-urls.manager.ts loads the API base URL from an environment-specific env file

- my-qa-assignment/api/utils/backend-auth
  - backend-auth.manager.ts loads authentication tokens from environment files

- my-qa-assignment/api/utils/endpoints
  - endpoints.json stores endpoint paths
  - endpoints.mapper.ts converts those paths into full URLs using the configured base URL

### UI layer
The UI layer follows a Page Object Model (POM) approach.

Folder breakdown:
- my-qa-assignment/ui/login
  - LoginPage.ts contains login actions and validation logic
  - locators.ts defines the locators used by the login page
  - tests.spec.ts exercises login scenarios

- my-qa-assignment/ui/products
  - ProductsPage.ts contains actions for adding products to the cart
  - locators.ts holds the product page selectors
  - tests.spec.ts verifies product selection flow

- my-qa-assignment/ui/cart
  - CartPage.ts contains cart navigation actions
  - locators.ts contains cart selectors

- my-qa-assignment/ui/checkout
  - CheckoutPage.ts handles checkout input and completion actions
  - locators.ts contains checkout selectors

- my-qa-assignment/ui/integration-tests
  - intgeration-tests.spec.ts represents a full happy-path UI journey from login to checkout

- my-qa-assignment/ui/utils
  - credentials: loads UI usernames and passwords from env files
  - navigational-urls: loads the base UI URL from env files
  - endpoints: maps UI page paths to absolute URLs
  - hooks: session/login-cookie handling
  - instance-registry: creates and lazily stores page-object instances
  - login-cookies: stores browser storage data for session reuse

### Shared utilities
- my-qa-assignment/global-utils/fixtures
  - global-fixtures.ts creates a reusable test fixture for the API registry

---

## 4. Important runtime concepts

### 4.1 Environment loading
The project uses dotenv-based managers to read values from environment-specific files.

Examples:
- API base URL manager loads values from base-urls.qa.env or the matching environment file
- UI credentials manager loads values from ui-credentials.qa.env
- UI navigation manager loads values from navigational-urls.qa.env
- Backend auth manager loads values from backend-auth.qa.env

The environment is selected using TEST_ENV, defaulting to qa.

### 4.2 Endpoint mapping
Endpoints are not hardcoded throughout the tests.
Instead:
- endpoint paths are stored in JSON files
- mapper files read those values and combine them with the configured base URL

This keeps tests readable and makes it easy to change paths in one place.

### 4.3 Page objects and lazy registry
For UI tests, the page-object classes encapsulate actions and assertions. Instead of manually creating each page object in every test, the UI instance registry lazily creates them only when needed.

This makes the tests cleaner and reduces duplication.

### 4.4 Shared API fixture
The API tests use a custom fixture defined in global-fixtures.ts. That fixture provides an API instance registry and attaches Playwright’s request context so requests can be executed through the helper layer.

---

## 5. API test flow
The API tests follow a consistent pattern:

1. Load headers from the API auth manager
2. Initialize the API client with the base URL and headers
3. Create a payload if needed
4. Send a request using the API client
5. Parse the response using the assertions helper
6. Validate status code and response body structure

### Example flow: add-user test
- The test imports the shared fixture and registry
- It creates a payload with the payload builder
- It sends a POST request to the create-user endpoint
- It checks whether the response contains name, job, id, and createdAt
- It asserts that the response status is 201

### Example flow: fetch-users test
- The test sends a GET request to the fetch-users endpoint
- It checks that the response contains data, page, per_page, total, and at least one user email

This pattern keeps API tests readable and reduces repeated request code.

---

## 6. UI test flow
The UI tests follow a browser-based flow with Playwright.

### Login flow
- A browser context and page are created
- The login page object fills in credentials and submits the form
- The test validates either a successful login state or an error state
- The session can be stored to reused cookies/storage state

### Product and checkout flow
- The products page adds items to the cart
- The cart page navigates to checkout
- The checkout page fills in personal details and completes the purchase

The integration test combines these steps into a full happy-path journey.

---

## 7. Key files and what they do

### Root configuration
- package.json
  - Holds npm scripts for running tests
  - Stores project dependencies

- playwright.config.ts
  - Sets Playwright defaults such as browser project, test directory, reporter, and browser launch options

### API files
- my-qa-assignment/api/tests/add-users.spec.ts
  - Tests the create-user API using POST

- my-qa-assignment/api/tests/fetch-users.spec.ts
  - Tests the fetch-users API using GET

- my-qa-assignment/api/builders/payload.builder.ts
  - Builds JSON payload bodies for API requests

- my-qa-assignment/api/utils/api-handler/apiclient.ts
  - Sends requests with Playwright request context

- my-qa-assignment/api/utils/api-handler/apiheaders.ts
  - Builds request headers

- my-qa-assignment/api/utils/api-handler/apiassertiions.ts
  - Parses and validates API responses

- my-qa-assignment/api/utils/instance-registry/instance.registry.ts
  - Central registry for API helper objects

- my-qa-assignment/api/utils/base-urls/base-urls.manager.ts
  - Loads backend base URL from env files

- my-qa-assignment/api/utils/backend-auth/backend-auth.manager.ts
  - Loads API auth token from env files

- my-qa-assignment/api/utils/endpoints/endpoints.mapper.ts
  - Builds full API URLs from endpoint path values

### UI files
- my-qa-assignment/ui/login/LoginPage.ts
  - Contains login actions and validations

- my-qa-assignment/ui/login/locators.ts
  - Defines the login selectors

- my-qa-assignment/ui/products/ProductsPage.ts
  - Handles product interactions

- my-qa-assignment/ui/cart/CartPage.ts
  - Handles cart navigation

- my-qa-assignment/ui/checkout/CheckoutPage.ts
  - Handles checkout steps and assertions

- my-qa-assignment/ui/utils/instance-registry/instance.registry.ts
  - Lazily creates the page objects for the UI tests

- my-qa-assignment/ui/utils/hooks/setup.ts
  - Uses stored cookies to reuse a logged-in session if it is still valid

- my-qa-assignment/ui/utils/endpoints/endpoints.mapper.ts
  - Maps UI page paths to their full URLs

### Shared files
- my-qa-assignment/global-utils/fixtures/global-fixtures.ts
  - Provides the shared API fixture for Playwright tests

---

## 8. How to run the tests
From the project root:

- npm install
- npx playwright install

Available npm scripts:
- npm run test:api:add-user
- npm run test:api:fetch-users
- npm run test:ui:login
- npm run test:ui:products
- npm run test:ui:checkout

Playwright will generate reports under the report and test-result folders after execution.

---

## 9. Notes on secrets and local files
The repository contains environment files and browser storage files that may include sensitive values.

The .gitignore file includes commented examples for these items so they are not accidentally committed during assessment work.

If you plan to share or push this repository publicly, uncomment the ignore rules and remove any secrets from tracked files.

---

## 10. Summary
This repository combines:
- structured API tests
- page-object-based UI tests
- shared fixtures and registries
- environment-based configuration
- reusable assertions and request handling

That structure makes it easier to extend the framework with new endpoints, pages, or test scenarios without rewriting core logic each time.
