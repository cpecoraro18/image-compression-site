import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

interface UploadFormProps {
  onResize: (file: File, sizes: string) => void;
  disabled: boolean;
}

const UploadForm = ({ onResize, disabled }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [sizes, setSizes] = useState("480,800,1200");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
      <Stack spacing={3}>
        <Typography variant="h4" align="center">
          Image Resizer
        </Typography>

        <Button variant="contained" component="label">
          {file ? "Change Image" : "Upload Image"}
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        {file && (
          <Typography variant="body1" align="center">
            Selected: {file.name}
          </Typography>
        )}

        <TextField
          label="Sizes (comma separated)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          disabled={disabled || !file}
          onClick={() => file && onResize(file, sizes)}
          sx={{ alignSelf: "center" }}
        >
          Resize & Download
        </Button>
      </Stack>
    </Paper>
  );
};

export default UploadForm;