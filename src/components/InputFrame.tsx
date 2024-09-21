import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const InputFrame: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
      <div className="flex space-x-4 w-full">
        {/* Input 1 */}
        <TextField
          label="Enter text"
          variant="outlined"
          className="flex-1"
          InputProps={{
            style: { borderRadius: "30px" },
          }}
        />

        {/* Select 1 */}
        <FormControl variant="outlined" className="flex-1">
          <InputLabel id="select1-label">Select Option 1</InputLabel>
          <Select
            labelId="select1-label"
            label="Select Option 1"
            style={{ borderRadius: "30px" }}
          >
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
          </Select>
        </FormControl>

        {/* Select 2 */}
        <FormControl variant="outlined" className="flex-1">
          <InputLabel id="select2-label">Select Option 2</InputLabel>
          <Select
            labelId="select2-label"
            label="Select Option 2"
            style={{ borderRadius: "30px" }}
          >
            <MenuItem value={1}>Option A</MenuItem>
            <MenuItem value={2}>Option B</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default InputFrame;
