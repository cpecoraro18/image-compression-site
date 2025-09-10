
import {
  Grid,
  Button,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";

interface ImageResult {
  size: number;
  url: string;
  format: string;
}

interface ResultsGridProps {
  results: ImageResult[];
}

const ResultsGrid = ({ results }: ResultsGridProps) => (
  <Grid container spacing={3} sx={{ mt: 4 }}>
    {results.map((img) => (
      <Grid key={img.url}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            image={img.url}
            alt={`Resized ${img.size}`}
            sx={{ height: 200, objectFit: "contain", backgroundColor: "#f5f5f5" }}
          />
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              size="small"
              variant="outlined"
              href={img.url}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default ResultsGrid;