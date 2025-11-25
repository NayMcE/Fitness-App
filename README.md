# Fitness Tracker

A modern web app to track your fitness metrics and monitor your weight loss progress.

## Features

- **Track Metrics**: Log daily calories, workouts, and weight
- **Visual Dashboard**: See your progress with charts and statistics
- **Weight Trends**: Monitor weight changes and trends
- **Workout Streaks**: Keep track of consecutive workout days
- **Local Storage**: All data is saved locally in your browser

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Usage

1. Click "Log Metrics" to add today's data
2. Fill in your weight, calories, and workout information
3. View your progress on the dashboard
4. Charts update automatically as you log more data

## Features Explained

### Dashboard Stats
- **Current Weight**: Your latest weight with trend indicator
- **Avg Calories (7d)**: Average daily calories from the last 7 days
- **Workout Streak**: Number of consecutive days you've worked out
- **Workouts This Week**: Total workouts in the last 7 days

### Charts
- **Weight Trend**: Line chart showing your weight over the last 30 days
- **Calories**: Bar chart showing daily calorie intake over the last 14 days

### Recent Logs
Quick view of your 10 most recent entries with date, calories, weight, and workout status

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization
- **Lucide React**: Icons
- **Vite**: Build tool
