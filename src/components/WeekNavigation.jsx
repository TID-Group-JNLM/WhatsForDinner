import Stack from "@mui/material/Stack";
import { Typography, IconButton } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

function formatDay(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function WeekNavigation({
  weekStart,
  weekEnd,
  onPrevious,
  onNext,
}) {
  return (
    <Stack
      component="nav"
      aria-label="Week"
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "primary.light",
        borderRadius: 1,
        px: 1,
      }}
    >
      <IconButton
        aria-label="Previous week"
        onClick={onPrevious}
        color="primary"
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography sx={{ color: "primary.dark", fontWeight: 700 }}>
        {formatDay(weekStart)} – {formatDay(weekEnd)}
      </Typography>
      <IconButton aria-label="Next week" onClick={onNext} color="primary">
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
}
