import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useHabitStore from "../store/store";

const AddHabitForm: React.FC = () => {
  const [name, setname] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const { addHabit } = useHabitStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabit(name, frequency);
      setname("");
      setFrequency("daily");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          name="name"
          label="Habit Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter habit name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            labelId="frequency"
            id="frequency"
            name="frequency"
            label="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
