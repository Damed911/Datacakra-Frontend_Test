# Dummy Travel API

## 🧱 Tech Stack

- **Frontend Library**: React.js + Typescript
- **Framework**: Remix.js
- **CSS Framework**: Tailwind.css
- **Component Library**: Shadcn/ui
- **State Management**: Recoil.js
- **API Integration & Management**: Tanstack/react-query
- **Version Control**: Git + GitHub
- **Package Management**: npm

---

## ⚙️ Installation Steps

1. **Clone the Repository / Download the .zip file**
   ```bash
   git clone https://github.com/Damed911/Datacakra-Frontend_Test
   cd your-project
   ```
2. **Install the javacript package**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📁 File Naming Structure

| Type            | Convention                            | Example                         |
| --------------- | ------------------------------------- | ------------------------------- |
| Files (scripts) | `lowercase-with-dash (except routes)` | `article-store.tsx`             |
| Folders         | `lowercase`                           | `routes`                        |
| Constants       | `camelCase`                           | `handleEdit`                    |
| Environment     | `.env`                                | `.env.local`, `.env.production` |

---

## 🗂️ Directory Layout

```plaintext
your-project/
│
├── app/                         # Core application code
|   |
|   |── api/                     # API call declaration
|   |   └── authentication.ts
|   |
│   ├── components/              # Reusable UI components
│   │   └── Button.tsx
│   │
│   ├── Helper/                  # Helper function
│   │   └── credentials.ts
│   │
│   ├── interfaces/                  # Interface definition for data type
│   │   └── credentials.ts
│   │
│   ├── lib/                     # Utility functions
│   │   └── fetcher.ts
│   │
│   ├── routes/                  # Route-based file structure
│   │   ├── index.tsx           # Home route
│   │   └── about.tsx           # About route
│   │
│   ├── schema/                     # Schema declaration for input data
│   │   └── user.schema.ts
│   │
│   ├── states/                  # State management declaration
│   │   └── auth.ts
│   │
│   ├── stores/                # State management store
│   │   └── authentication-store.tsx
│   │
│   ├── root.tsx                 # Root layout and entry
│   ├── entry.client.tsx         # Client entry point
│   └── entry.server.tsx         # Server entry point
│
├── public/                      # Static assets
│   └── favicon.ico
│
├── .env                         # Environment variables
├── remix.config.js              # Remix configuration
├── tailwind.config.ts          # Tailwind CSS configuration (if used)
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation

```
