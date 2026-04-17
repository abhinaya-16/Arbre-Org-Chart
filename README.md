# Arbre-Org-Chart

A dynamic, full-stack data visualization platform that transforms complex organizational hierarchies from static spreadsheets into interactive, searchable, and exportable organizational charts.

![Demo](./frontend/src/assets/demo_v2.gif)

## Purpose
In many enterprise environments, organizational data remains trapped in flat Excel files, making it difficult to visualize reporting lines or departmental structures. **GeniusLab Org-Chart** bridges this gap by providing a seamless interface to ingest, process, and render hierarchical data. 

Built with a focus on performance and user experience, this tool allows HR professionals and team leads to navigate large organizations, search for specific team members, and generate high-quality PDF reports of the structure.

---

## Technical Stack

* **Frontend:** React, D3.js (via `d3-org-chart`) for high-performance SVG rendering.
* **Backend:** Node.js, Express.js.
* **Data Processing:** ExcelJS for server-side parsing of `.xlsx` files.
* **Authentication & Identity:** 
    - Microsoft Entra External ID (Single-tenant configuration) 
    - MSAL.js for secure OAuth 2.0 / OpenID Connect flows 
    - Token-based authentication with protected routes and session management
* **Cloud & Identity Protocols:** OAuth 2.0, OpenID Connect (OIDC)
* **Styling:** Custom CSS with a focus on clean, modern UI and intuitive navigation.
---

## Key Features

* **Automated Hierarchy Logic:** Automatically converts flat Excel rows (ID/ParentID) into a nested JSON tree structure.
* **Interactive Visualization:** Smooth zooming, panning, and collapsing/expanding of organizational branches.
* **Search & Locate:** Integrated search functionality to instantly find and center on specific employees.
* **PDF Export:** Client-side PDF generation to share specific views of the organizational chart.
* **Custom UI Components:** Tailored node designs featuring employee roles and unique departmental icons.

---

## Installation & Setup

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn

### 1. Clone the Repository
```bash
git clone [https://github.com/abhinayakondi/GeniusLab-Org-chart.git](https://github.com/abhinayakondi/GeniusLab-Org-chart.git)
cd GeniusLab-Org-chart
```

### 2. Backend Setup

1.  **Navigate** to the server directory:
    ```bash
    cd backend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Prepare Data**: Ensure your employee data is formatted in `employees.xlsx` within the root server folder.
4.  **Start the server**:
    ```bash
    node server.js
    ```

---

### 3. Frontend Setup

1.  **Navigate** to the client directory:
    ```bash
    cd frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the React application**:
    ```bash
    npm run dev
    ```

---

### Data Format

To populate the chart, ensure the `employees.xlsx` file contains the following columns:

| Column | Description |
| :--- | :--- |
| **ID** | Unique identifier for the employee. |
| **ParentID** | The ID of the manager/supervisor (leave empty for the CEO/Root). |
| **First Name** | Employee first name. |
| **Last Name** | Employee last name. |
| **Department Name** | Employee department name. |
| **Title** | Professional designation. |

---

### Engineering Highlights

* **Data Transformation**: Implemented an efficient recursive algorithm to build the tree structure from flat data, ensuring $O(n)$ time complexity for processing large datasets.
* **SVG Optimization**: Leveraged D3-based rendering to ensure the application remains responsive even when displaying hundreds of nodes.
* **Modular Architecture**: Separated data ingestion logic from the presentation layer, allowing for future integrations with SQL databases or live HRIS APIs.
