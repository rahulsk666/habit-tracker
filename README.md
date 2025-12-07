# Habit Tracker — React + TypeScript + Vite

A small habit-tracking app built with React + TypeScript and Vite. This repo demonstrates a minimal UI for adding, toggling, and removing habits, and uses Zustand for state management (with persistence and devtools enabled).

## Quick Start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (Vite default) to view the app.

## Project Structure (high level)

- `src/main.tsx` — app entry and React DOM mount
- `src/App.tsx` — top-level UI and routes (single-page)
- `src/components/` — UI components (e.g. `AddFormHabits.tsx`, `HabitList.tsx`)
- `src/store/store.ts` — Zustand store (habits state)
- `src/App.css`, `src/index.css`, `src/assets/` — styles and assets

## State Management (Zustand in this branch)

This branch uses Zustand for state management. The primary store is located at:

```text
src/store/store.ts
```

The store exports a default hook `useHabitStore` with the following shape:

- `habits: Habit[]` — current list of habits
- `addHabit(name: string, frequency: 'daily' | 'weekly')` — add a new habit
- `removeHabit(id: string)` — remove a habit by id
- `toggleHabit(id: string, date: string)` — toggle completion for a habit on a specific date
- `fetchHabits()` — an async helper that loads mock habits (used at app start)
- `isLoading` and `error` — basic loading/error flags

The `Habit` interface defined in the store looks like this:

```ts
export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}
```

The store uses `persist` (so state is saved to `localStorage` under the key `habits-local`) and `devtools` middleware. See `src/store/store.ts` to adjust persistence or disable devtools.

### Example: using the store in a component

```tsx
import React from "react";
import useHabitStore from "./store/store";

export default function Example() {
  const { habits, addHabit, toggleHabit, removeHabit } = useHabitStore();

  return (
    <div>
      <button onClick={() => addHabit("Read", "daily")}>Add Read</button>
      <ul>
        {habits.map((h) => (
          <li key={h.id}>
            {h.name} ({h.frequency})
            <button
              onClick={() =>
                toggleHabit(h.id, new Date().toISOString().slice(0, 10))
              }
            >
              Toggle Today
            </button>
            <button onClick={() => removeHabit(h.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Where to look in this repo

- `src/components/AddFormHabits.tsx` — shows how the app calls `addHabit(name, frequency)`
- `src/components/HabitList.tsx` — shows how `habits`, `toggleHabit`, and `removeHabit` are used in the UI
- `src/store/store.ts` — the full store implementation with `persist` and `devtools`

## Redux (notes)

This project/branch uses Zustand. If you prefer Redux, a typical Redux Toolkit layout would include `src/app/store.ts` and `src/features/*` slices created with `createSlice`. There is no Redux setup in the current branch, but the README previously contained generic guidance for adding Redux if needed.

## Habit Tracker Features

- Add habits with a name and frequency (`daily` | `weekly`)
- Toggle completion for a specific date (stored in `completedDates` per habit)
- Persistent local storage of habits via Zustand `persist`
