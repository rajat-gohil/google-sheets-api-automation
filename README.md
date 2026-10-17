# Google Sheets API Automation

An automated data pipeline built with Google Apps Script and Google Sheets that retrieves product data from a public REST API, organizes the records, performs category-based lookups, and calculates summary metrics.

The project demonstrates how repetitive data collection and reporting tasks can be automated using JavaScript, REST APIs, and spreadsheet formulas.

## Features

- **API integration:** Fetches product data from the DummyJSON public REST API.
- **Automated data import:** Retrieves product details and writes them into Google Sheets.
- **Data transformation:** Extracts product IDs, titles, categories, brands, prices, discounts, ratings, and stock levels.
- **Category analysis:** Groups products by category and calculates product counts.
- **Advanced lookups:** Uses `XLOOKUP` to map category counts to individual products.
- **Summary reporting:** Calculates average product price, total inventory units, and out-of-stock product counts.
- **Scheduled execution:** Supports daily imports using Google Apps Script time-driven triggers.
- **Error handling:** Checks HTTP responses and validates the expected API response structure.

## Technology Stack

- Google Sheets
- Google Apps Script
- JavaScript
- REST API
- JSON
- Spreadsheet formulas (`XLOOKUP`, `AVERAGE`, `SUM`, `COUNTIF`)

## Architecture

```text
DummyJSON REST API
        |
        v
Google Apps Script
        |
        v
Fetch and Validate JSON
        |
        v
Transform Product Records
        |
        v
Google Sheets
   |      |      |
   v      v      v
Products Categories Summary
   |
   v
XLOOKUP-Based Analysis
```

## Data Source

This project uses the DummyJSON products endpoint:

https://dummyjson.com/products?limit=100

The API provides sample product records for testing data extraction, transformation, and reporting workflows without requiring an API key.

The endpoint requests up to 100 products. The number of records returned depends on the API response.

## Google Sheets Structure

The spreadsheet contains three worksheets.

### 1. Products

Stores the imported product data.

| Column | Description |
|---|---|
| Product ID | Unique product identifier |
| Title | Product name |
| Category | Product category |
| Brand | Product brand, or `Unknown` if missing |
| Price | Product price returned by the API |
| Discount % | Product discount percentage |
| Rating | Product rating |
| Stock | Available stock quantity |
| Stock Status | In Stock or Out of Stock |
| Category Count | Number of imported products in the same category |

### 2. Categories

Groups products by category and calculates the number of products in each category.

| Column | Description |
|---|---|
| Category | Unique product category |
| Product Count | Number of products belonging to that category |

### 3. Summary

Provides an overview of the imported dataset.

| Metric | Description |
|---|---|
| Products Imported | Number of products retrieved |
| Average Price | Average price across imported products |
| Total Inventory Units | Sum of the reported stock quantities |
| Out-of-Stock Products | Number of products with zero stock |

## Getting Started

### Prerequisites

You need:

- A Google account.
- Access to Google Sheets.
- Access to Google Apps Script.
- An internet connection to reach the public API.

No local development environment or paid API subscription is required for the basic project.

### Step 1: Create the spreadsheet

1. Open [Google Sheets](https://sheets.google.com/).
2. Create a blank spreadsheet.
3. Name it `API Product Data Automation`.
4. Create three tabs named `Products`, `Categories`, and `Summary`.

The script can also create these tabs automatically if they do not already exist.

### Step 2: Open Apps Script

1. Select **Extensions → Apps Script** in your spreadsheet.
2. Open `Code.gs`.
3. Paste the project's JavaScript code into the editor.
4. Save the project.

### Step 3: Run the import

1. Select the `importProducts` function.
2. Click **Run**.
3. Review and authorize the requested Google permissions.
4. Return to the spreadsheet and verify the populated worksheets.

The script replaces the existing cell contents on each import. It does not maintain historical snapshots of previous imports.

### Step 4: Add the category lookup

In cell `J1` of the `Products` sheet, enter:

```text
Category Count
```

In cell `J2`, enter:

```excel
=ARRAYFORMULA(IF(C2:C="","",XLOOKUP(C2:C,Categories!A2:A,Categories!B2:B,"Not Found")))
```

This formula looks up each product's category in the `Categories` worksheet and returns the corresponding product count.

### Step 5: Enable daily automation

The project includes a `createDailyTrigger` function.

1. Open Apps Script.
2. Select `createDailyTrigger`.
3. Click **Run** and authorize it if prompted.
4. Open the Apps Script **Triggers** panel.
5. Verify that the daily trigger has been created.

Run the trigger-creation function only once unless you intentionally want to manage multiple triggers.

Time-driven triggers execute according to Google's scheduling behavior; the exact execution time is not guaranteed.

## Error Handling

The script checks that:

- The API returns HTTP status `200`.
- The response contains a `products` array.
- Product records can be transformed into spreadsheet rows.

If the request fails or the response structure is unexpected, the script raises an error instead of continuing with an invalid import.

## Testing and Verification

After running the import, verify the following:

- Product records appear in the `Products` worksheet.
- Categories are unique and sorted alphabetically.
- Category counts match the imported product records.
- The `Category Count` lookup returns the correct value for each product.
- Summary metrics are calculated correctly.
- A subsequent import refreshes the dataset without adding duplicate rows.

## Repository Structure

```text
google-sheets-api-automation/
├── README.md
├── Code.gs
└── screenshots/
    ├── products.png
    ├── categories.png
    └── summary.png
```

Add screenshots after running the project. Include a sample CSV only if you have exported and verified the actual output.

## Limitations

- The project depends on the availability and response structure of the DummyJSON API.
- The script imports the current dataset rather than preserving historical records.
- Summary metrics describe the returned sample data, not actual commercial inventory.
- Scheduled execution depends on Google Apps Script quotas and trigger availability.
- The project does not currently include automated retries, historical trend analysis, or a dashboard with charts.
- Product prices and stock quantities are sample data and should not be treated as real market information.

## Future Improvements

Potential extensions include:

- Adding pagination to retrieve larger datasets.
- Recording timestamped historical snapshots.
- Creating charts and pivot-table reports.
- Sending email notifications when stock levels fall below a threshold.
- Adding configurable API endpoints.
- Implementing automated data-quality checks.
- Comparing current and previous imports to identify changes.
- Adding unit tests for transformation and summary logic.

## Learning Outcomes

This project demonstrates practical experience with:

- REST API integration.
- JSON parsing and data transformation.
- Google Apps Script automation.
- Google Sheets data management.
- Lookup formulas and summary calculations.
- Time-driven triggers.
- Basic error handling.
- Documentation and reproducible project setup.
