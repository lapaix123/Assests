# Assets Management System

A comprehensive web-based asset management system for tracking, maintaining, and managing organizational assets, styled with Marriott brand colors.

## Project Structure

The project is organized into the following folders:

- **pages/** - Contains HTML pages for different views
  - `index.html` - Main application entry point with fragment loading
  - `dashboard.html` - Dashboard view with all components integrated
  - `overview.html` - Comprehensive features overview page

- **fragments/** - Contains reusable HTML components
  - `fragment-topbar.html` - Top navigation bar
  - `fragment-sidebar.html` - Sidebar navigation menu
  - `fragment-main.html` - Main content area
  - `fragment-footer.html` - Footer component

- **js/** - Contains JavaScript files
  - `app.js` - Main application logic, routing, and fragment loading

- **css/** - For future CSS stylesheets (currently using TailwindCSS via CDN)

## Features

### Dashboard
- KPIs (Total Assets, NBV, Due for Service, Overdue Verifications)
- Charts showing distribution by Category and Location
- Recent activity feed
- Quick action buttons

### Asset Register
- Smart filters (Category, Location tree, Department, Status, Condition)
- Column chooser for customized views
- Bulk actions (verify, assign, export)
- Pagination and sorting

### Add Asset
- One-page form with progressive sections:
  - Core Information
  - Ownership & Assignment
  - Location
  - Financial Information
  - Warranty & Insurance

### Asset Detail
- Tabs for different information categories:
  - Overview (ID, QR, location, assignment)
  - Financials (cost, useful life, method, NBV timeline)
  - Maintenance (history & upcoming)
  - Documents (invoice, warranty, photos)
  - Audit Trail

### Assignments
- Transfer wizard (department/employee)
- Assignment history log

### Additional Modules
- **Maintenance**: Work orders, schedules, service calendar, cost capture
- **Depreciation**: Methods, runs by period, preview & post, export
- **Physical Verification**: Scan sessions (QR/barcode), exception reports
- **Disposals**: Request → approve → record method & proceeds → accounting handoff
- **Suppliers & Procurement**: Supplier directory, PO/Invoice references, warranty tracking
- **Reports**: Canned + builder (CSV/XLSX/PDF): register, NBV, aging, maintenance cost
- **Admin / Settings**: Roles & permissions, numbering schemes, custom fields, alerts

## Technology Stack

- HTML5
- TailwindCSS (via CDN) with Marriott brand colors
- JavaScript (Vanilla)
- Chart.js for data visualization
- Lucide for icons

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser to access the application
3. Or open `overview.html` to see a comprehensive features overview
4. Navigate through the application using the sidebar menu

## Development

The application uses a fragment-based architecture where:

1. The main HTML files in the `pages/` folder define the overall structure
2. Fragments in the `fragments/` folder are loaded dynamically
3. The `app.js` file handles routing and content rendering

To add a new page:
1. Add a new route in the `routes` object in `app.js`
2. Create any necessary fragment files
3. Update the sidebar navigation if needed

## License

This project is for demonstration purposes only.