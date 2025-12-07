import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
  fetchHabits: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          habits: [],
          isLoading: false,
          error: null,
          addHabit: (name, frequency) =>
            set((state) => {
              return {
                habits: [
                  ...state.habits,
                  {
                    id: Date.now().toString(),
                    name,
                    frequency,
                    completedDates: [],
                    createdAt: new Date().toISOString(),
                  },
                ],
              };
            }),
          removeHabit: (id) =>
            set((state) => ({
              habits: state.habits.filter((habit) => habit.id !== id),
            })),
          toggleHabit: (id, date) =>
            set((state) => ({
              habits: state.habits.map((habit) =>
                habit.id === id
                  ? {
                      ...habit,
                      completedDates: habit.completedDates.includes(date)
                        ? habit.completedDates.filter((d) => d !== date)
                        : [...habit.completedDates, date],
                    }
                  : habit
              ),
            })),
          fetchHabits: async () => {
            set({ isLoading: true });
            try {
              const currentHabits = get().habits;
              if (currentHabits.length > 0) {
                set({ isLoading: false });
                return;
              }
              await new Promise((resolve) => setTimeout(resolve, 1000));
              const mockHabits: Habit[] = [
                {
                  id: "1",
                  name: "Read",
                  frequency: "daily",
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
                {
                  id: "2",
                  name: "Exercise",
                  frequency: "daily",
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
                {
                  id: "3",
                  name: "Study",
                  frequency: "daily",
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
                {
                  id: "4",
                  name: "Wash Car",
                  frequency: "weekly",
                  completedDates: [],
                  createdAt: new Date().toISOString(),
                },
              ];
              set({ habits: mockHabits, isLoading: false });
            } catch (error) {
              set({ error: "Failed to fetch habits", isLoading: false });
            }
          },
        };
      },
      {
        name: "habits-local",
      }
    )
  )
);

export default useHabitStore;
