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

## Architecture

The application uses a clean service-oriented architecture:

- **Service Layer**: Abstracted service interfaces for data operations
- **Factory Pattern**: Easy swapping between mock and production services
- **Custom Hooks**: React hooks for component-service integration
- **Type Safety**: Full TypeScript coverage for type safety

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
