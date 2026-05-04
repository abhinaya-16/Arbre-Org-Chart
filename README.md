# Arbre-Org-Chart

A dynamic, full-stack data visualization platform that transforms complex organizational hierarchies from static spreadsheets into interactive, searchable, and exportable organizational charts.

<div align="center">
  <h3>Video Demo</h3>
  <a href="https://youtu.be/vksEElQ-yDk">
    <img src="https://img.youtube.com/vi/vksEElQ-yDk/maxresdefault.jpg" alt="Arbre Org Chart Demo" style="width:100%; max-width:600px; border-radius: 10px; border: 1px solid #ddd; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  </a>
  <p><i>Click to watch the full walkthrough on YouTube</i></p>
</div>

## Purpose
In many enterprise environments, organizational data remains trapped in flat Excel files, making it difficult to visualize reporting lines or departmental structures. **GeniusLab Org-Chart** bridges this gap by providing a seamless interface to ingest, process, and render hierarchical data. 

Built with a focus on performance and user experience, this tool allows HR professionals and team leads to navigate large organizations, search for specific team members, and generate high-quality PDF reports of the structure.

---

## Technical Stack

* **Frontend:** React, D3.js (via `d3-org-chart`) for high-performance SVG rendering.
* **Backend:** 
    - Node.js, Express.js.
    - Python (Flask) Backend functions for processing & data transformation
* **Data Processing:** ExcelJS for server-side parsing of `.xlsx` files.
* **Authentication & Identity:** 
    - Microsoft Entra External ID (Single-tenant configuration) 
    - MSAL.js for secure OAuth 2.0 / OpenID Connect flows 
    - Token-based authentication with protected routes and session management
* **Cloud & Identity Protocols:** 
    - Azure Blob Storage → File storage for uploaded documents
    - Azure SQL Database → stores file metadata
    - Azure Functions → Serverless backend processing for file handling and parsing
* **Styling:** Custom CSS with a focus on clean, modern UI and intuitive navigation.
---

## Key Features

* **File Upload & Processing:** Upload organizational data files (Excel).
* **Automated Hierarchy Logic:** Automatically converts flat Excel rows (ID/ParentID) into a nested JSON tree structure.
* **Dashboard & Insights:** Summary of uploaded files and processed data. Metadata tracking (timestamps, file size, status)
* **Interactive Visualization:** Smooth zooming, panning, and collapsing/expanding of organizational branches.
* **API-Driven Architecture:** Clean separation of frontend and backend. Modular API endpoints for:
    - File upload
    - Data management
    - Org chart generation
    - Employee Data retrieval
* **Cloud-Native Design:** Serverless processing using Azure Functions. Scalable file storage via Azure Blob Storage
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
### 2. Backend Functions (Python) Setup

1.  **Navigate** to the server directory:
    ```bash
    cd backend-functions
    ```
2.  **Create virtual environment**:
    ```bash
    python -m venv .venv
    ```
3.  **Activate (Git Bash)**: 
    ```bash
    source .venv/Scripts/activate
    ```
4.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
5.  **Run**:
    ```bash
    func start
    ```

---

### 3. Backend Node Setup

1.  **Navigate** to the server directory:
    ```bash
    cd backend-node
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

### 4. Run Full Application

1.  **Frontend →** http://localhost:3000
2.  **Backend →** http://localhost:5000
3.  **Azure Functions →** http://localhost:7071

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
