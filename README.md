# Marcelle Ferron - Guide Numérique Kiosk

This is an interactive kiosk experience that lets you explore the art of Marcelle Ferron, discover the science behind her work, and create your own art inspired by her style. Designed for kids 10-14.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd marcelle-ferron-kiosk
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your API Key:**
    -   Create a copy of the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    -   Open the newly created `.env.local` file in your code editor.
    -   Replace `YOUR_API_KEY_HERE` with your actual Google Gemini API key.

    **File: `.env.local`**
    ```
    VITE_GEMINI_API_KEY="AIzaSy...your...key"
    ```
    > **Note:** The `.env.local` file is included in `.gitignore` and will not be committed to GitHub, keeping your API key safe.

## Running the Development Server

Once the setup is complete, you can start the local development server:

```bash
npm run dev
```

This will start the Vite development server. Open your web browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`). The application will automatically reload as you make changes to the source files.

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Compiles and bundles the application for production into the `dist/` directory.
-   `npm run preview`: Serves the production build locally to preview it before deployment.
