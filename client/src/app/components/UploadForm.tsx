import type { JSX } from "react"
import { useState, useCallback } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

interface UploadFormProps {
  onResize: (files: File[], sizes: string, format: string) => void;
  disabled: boolean;
}

export function UploadForm ( props : UploadFormProps ) : JSX.Element {
  const { onResize, disabled } = props;

  const [files, setFiles] = useState<File[]>([]);
  const [sizes, setSizes] = useState("480,800,1200");
  const [format, setFormat] = useState("webp");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
      <Stack spacing={3}>
        <Typography variant="h4" align="center">
          Image Resizer
        </Typography>

        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed",
            borderColor: isDragActive ? "primary.main" : "grey.400",
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            bgcolor: isDragActive ? "action.hover" : "background.paper",
          }}
        >
          <input {...getInputProps()} />
          <Typography>
            {isDragActive
              ? "Drop the files here…"
              : "Drag & drop images here"}
          </Typography>
        </Box>

        <Button variant="contained" component="label">
          {files.length ? "Change Images" : "Upload Images"}
          <input
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </Button>

        {files.length > 0 && (
          <Typography variant="body1" align="center">
            Selected: {files.map((file) => file.name).join(", ")}
          </Typography>
        )}

        <TextField
          label="Sizes (comma separated)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="format-label">Format</InputLabel>
          <Select
            labelId="format-label"
            value={format}
            label="Format"
            onChange={(e) => setFormat(e.target.value)}
          >
            <MenuItem value="webp">WebP</MenuItem>
            <MenuItem value="jpeg">JPEG</MenuItem>
            <MenuItem value="png">PNG</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          disabled={disabled || !files.length}
          onClick={() => files.length && onResize(files, sizes, format)}
          sx={{ alignSelf: "center" }}
        >
          Resize & Download
        </Button>
      </Stack>
    </Paper>
  );
};

export default UploadForm;
