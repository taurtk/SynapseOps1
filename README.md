# 🚀 SynapseOps: The Automated Employee Onboarding Hub

A modern, highly-integrated application designed to **eliminate manual HR and IT overhead** during employee onboarding by orchestrating workflows, managing tasks, and providing a personalized dashboard for new hires.

| Project Lead | Team Member | Team Member |
| :--- | :--- | :--- |
| **Sameer Ahmed** | Taufique | Bhavana Shah |

-----

## 🎯 Problem Solved & Value Proposition

| The Challenge (Fragmentation & Manual Work) | The Solution (SynapseOps Hub) |
| :--- | :--- |
| **Inefficient Data Flow:** HR/IT tasks are initiated via manual emails and spreadsheets, leading to data loss and delays. | **End-to-End Automation:** An **n8n workflow** instantly translates HR form data into action (tasks, calendar invites, emails), guaranteeing **zero data lag** and eliminating manual steps. |
| **Poor Employee Experience:** New hires lack a single, clear source for their onboarding checklist and status. | **Personalized Live Dashboard:** A single-page application provides a real-time, custom view of **required tasks**, **accurate leave balances**, and **recent leave requests**. |

-----

## ✨ Key Features

### Onboarding Dashboard (The Working Product)

  * **Dynamic Personalized View:** Consumes data directly from the **Airtable REST API**, filtering all content (tasks, leave balance, history) instantly based on the selected employee's name.
  * **Near Real-time Status Sync:** Uses **React Query Polling** to automatically refresh the task checklist every 5 seconds, providing instant visual confirmation when HR marks a task as complete.
  * **Comprehensive Leave Management:** Displays the total available leave days and a dynamic breakdown for **Annual, Sick, and Personal Leave**, calculated using **Airtable Rollup fields**.
  * **Responsive Design:** Mobile-first approach with adaptive layouts using Tailwind CSS.

### Automation & Backend (The Engine)

  * **Workflow Orchestration (n8n):** Triggers the entire pipeline from HR Form submission, executing simultaneous actions: **Task Creation**, **Google Calendar Event Setup**, and sending the **Welcome Email**.
  * **Database:** **Airtable** serves as the structured, relational backend for all employee, task, and leave data.

### Chatbot Integration

  * **Embedded AI Support:** Features an integrated assistant powered by **AWS Lex** for real-time query resolution on common HR and IT onboarding topics.

-----

## 💻 Technologies Used

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **Data/Backend** | **Airtable** (Headless CMS) |
| **Automation** | **n8n** (Workflow Orchestration) |
| **API/State** | **Airtable REST API**, React Query (TanStack Query) |
| **AI/Chatbot** | **AWS Lex Runtime V2** |
| **Hosting** | **AWS S3** (Static Dashboard Hosting) |

-----

## 📂 Project Structure

```
├── client/          # The core React/TypeScript Dashboard UI
│   ├── src/
│   │   ├── components/  # Reusable UI components and widgets
│   │   ├── pages/       # Dashboard pages
│   │   └── lib/         # Utility functions and the airtable.ts connector
├── Chatbot/         # Standalone codebase for the AWS Lex Chatbot UI
├── README.md        # Documentation and Project Overview
```

## ⚙️ Installation & Usage

1.  **Clone the Repository:**

    ```bash
    git clone <repository-url>
    cd SynapseOps1/client
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Build the Production Dashboard:**

    ```bash
    npm run build
    ```

    *(The output in the `dist/` folder is uploaded directly to the AWS S3 static site.)*

-----

## 🌐 Live Demo Access

| Resource | Link |
| :--- | :--- |
| **Live Dashboard** | `http://onboarding-dashboard-ui.s3-website-us-east-1.amazonaws.com/` (Your AWS S3 Link) |

## Scripts

  - `npm run dev` - Start development server (local testing)
  - `npm run build` - **Build the final production bundle**
  - `npm run check` - Run TypeScript type checking

-----
