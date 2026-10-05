# Save-All

A full-stack web application for creating and organizing personalized cards.

## About

Save-All allows users to create cards with a title, description, category, image, and custom color. Cards are stored in MongoDB and can be searched by title, description, or category.

## Technologies

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript

## Features

- Create cards
- Search cards
- Categorize cards
- Add images
- Customize card colors
- Store cards in MongoDB
- Automatically record the creation date

## Installation

Clone the repository:

```bash
git clone https://github.com/ryankennedydev/save-all.git
cd save-all
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `api` folder:

```env
MONGODB_URI=your_mongodb_connection_string
```

## Running

Start the backend:

```bash
node api/server.js
```

Start the frontend in another terminal:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```
