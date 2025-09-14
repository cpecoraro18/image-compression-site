import type { JSX } from "react"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import type { ImageResult } from "../../types/ImageResult";

interface ResultsGridProps {
  results: ImageResult[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ResultsGrid(props: ResultsGridProps): JSX.Element {
  const { results } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (

    <Box sx={{ p: 4, width: "100%" }}>
      <List sx={{ width: "100%", bgcolor: "background.paper", mt: 4 }}>
        {results.map((img) => (
          <ListItem
            key={img.url}
            sx={{
              display: "flex",
              alignItems: isMobile ? "stretch" : "center",
              borderBottom: "1px solid #eee",
              py: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={img.url}
                alt={`Resized ${img.size}`}
                sx={{ width: 56, height: 56, bgcolor: "#f5f5f5", mr: 2, mt: 0.5 }}
              />
            </ListItemAvatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                width: "100%",
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  alignItems={isMobile ? "flex-start" : "center"}
                  spacing={isMobile ? 0.5 : 2}
                >
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                    {img.originalName || img.url.split("/").pop()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatSize(img.fileSize ?? img.size)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                    Format: {img.format?.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                    Size: {img.width}x{img.height}
                  </Typography>
                </Stack>
              </Box>
              <Button
                size="small"
                variant="outlined"
                href={img.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: isMobile ? 1 : 0, minWidth: 100, alignSelf: isMobile ? "flex-start" : "center" }}
              >
                Download
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ResultsGrid;