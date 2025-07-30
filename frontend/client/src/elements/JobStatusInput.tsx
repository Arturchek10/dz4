import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function JobStatusInput({ value, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value); // просто передаём новое значение вверх
  };

  return (
    <FormControl sx={{ minWidth: "40%" }}>
      <InputLabel id="job-status-label">Работа</InputLabel>
      <Select
        labelId="job-status-label"
        id="job-status"
        value={value}
        label="Работа"
        onChange={handleChange}
        sx={{
          minHeight: "50px",
          "& .MuiSelect-select": {
            padding: "10px",
            letterSpacing: "0.045em",
          },
          "&.MuiOutlinedInput-root": {
            letterSpacing: "0.35em",
          },
        }}
      >
        <MenuItem value="Трудоустроен">Трудоустроен</MenuItem>
        <MenuItem value="Не трудоустроен">Не трудоустроен</MenuItem>
      </Select>
    </FormControl>
  );
}
