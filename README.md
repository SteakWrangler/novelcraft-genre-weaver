# NovelCraft Genre Weaver

A sophisticated web application for AI-powered novel generation with advanced genre blending and customization capabilities.

## Overview

NovelCraft Genre Weaver is a modern React-based application that enables users to create unique novels by combining multiple genres, selecting narrative elements, and customizing various aspects of story generation. The application features a clean, intuitive interface built with modern web technologies.

## Features

- **Genre Blending**: Combine multiple genres to create unique story mashups
- **Inspiration System**: Choose from curated tropes, themes, and narrative elements
- **Dual Creation Modes**: Simple quick-start option or advanced customization
- **Book Library**: Manage and organize your generated content
- **Cost Estimation**: Real-time cost calculation for generation parameters
- **Format Options**: Support for multiple output formats and quality levels
- **Responsive Design**: Fully responsive interface that works on all devices

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives with shadcn-ui
- **State Management**: React Hooks with localStorage persistence
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/novelcraft-genre-weaver.git
cd novelcraft-genre-weaver
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and helpers
├── pages/          # Page components
├── services/       # Service layer and API interfaces
└── types/          # TypeScript type definitions
```

## Architecture

The application uses a clean service-oriented architecture:

- **Service Layer**: Abstracted service interfaces for data operations
- **Factory Pattern**: Easy swapping between mock and production services
- **Custom Hooks**: React hooks for component-service integration
- **Type Safety**: Full TypeScript coverage for type safety

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Code Style

This project uses ESLint with TypeScript support. Run `npm run lint` to check for code style issues.

## Future Enhancements

- Database integration for persistent storage
- Real-time AI generation with progress streaming
- User authentication and profile management
- Advanced content management system
- Export functionality for various formats

## License

This project is private and proprietary.

## Contact

For inquiries or support, please open an issue in the repository.
