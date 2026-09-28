/* Progresso circular com o percentual no centro */
import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material";

export default function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" aria-label="Progresso do preenchimento" {...props} />
      <Box sx={{ inset: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
/* Fim de CircularProgressWithLabel.tsx */
