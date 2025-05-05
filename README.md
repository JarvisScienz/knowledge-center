# Knowledge Center

A modern React web application that acts as a personal knowledge container about specific topics. The application features a ChatGPT-like interface with a collapsible sidebar and command-based interaction.

## Features

- Modern, responsive UI with dark mode support
- Hierarchical knowledge organization
- Command-based interaction system
- Collapsible sidebar navigation
- Search functionality
- Export capability

## Available Commands

- `@show 'argument'`: Display all information related to the argument
- `@search 'keyword'`: Search through all topics and objects
- `@add 'main-topic' 'topic' 'object' 'answer'`: Add a new entry
- `@edit 'argument'`: Modify an existing entry
- `@delete 'argument'`: Delete an existing entry
- `@export`: Export the knowledge base as JSON
- `@help`: List all available commands

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/components/`: React components
  - `Sidebar.tsx`: Navigation component
  - `MainContent.tsx`: Content display component
  - `ChatInput.tsx`: Command input component
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions
- `src/App.tsx`: Main application component

## Technologies Used

- React
- TypeScript
- TailwindCSS
- HeadlessUI
- Heroicons

## License

MIT
