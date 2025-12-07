import { Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/AddFormHabits";
import HabitList from "./components/HabitList";
import { useEffect } from "react";
import HabitStats from "./components/HabitStats";

function App() {
  const { fetchHabits } = useHabitStore();

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h2" align="center">
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
      <HabitStats />
    </Container>
  );
}

export default App;
