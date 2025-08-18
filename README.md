# Assets Management System

A web-based asset management system for tracking, maintaining, and managing organizational assets.

## Project Structure

The project is organized into the following folders:

- **pages/** - Contains HTML pages for different views
  - `index.html` - Main application entry point with fragment loading
  - `dashboard.html` - Dashboard view with all components integrated

- **fragments/** - Contains reusable HTML components
  - `fragment-topbar.html` - Top navigation bar
  - `fragment-sidebar.html` - Sidebar navigation menu
  - `fragment-main.html` - Main content area
  - `fragment-footer.html` - Footer component

- **js/** - Contains JavaScript files
  - `app.js` - Main application logic, routing, and fragment loading

- **css/** - For future CSS stylesheets (currently using TailwindCSS via CDN)

## Features

- **Dashboard** - Overview of asset metrics and recent activity
- **Asset Management** - Register, add, and manage assets
- **Maintenance** - Plan and track maintenance work orders
- **Depreciation** - Configure methods and post depreciation runs
- **Verification** - Run physical verification sessions
- **Disposals** - Request, approve, and record disposals
- **Procurement** - Link suppliers, POs, invoices to assets
- **Reports** - Generate various asset reports
- **Admin/Settings** - Manage roles, numbering sequences, etc.
- **Lookups** - Manage reference data for the system

## Technology Stack

- HTML5
- TailwindCSS (via CDN)
- JavaScript (Vanilla)
- Chart.js for data visualization
- Lucide for icons

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Navigate through the application using the sidebar menu

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