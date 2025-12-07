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
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addHabit } from "../store/habit-slice";

const AddHabitForm: React.FC = () => {
  const [name, setname] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(
        addHabit({
          name,
          frequency,
        })
      );
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
        <FormControl>
          <InputLabel>Frequency</InputLabel>
          <Select
            name="frequency"
            label="frequency"
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
