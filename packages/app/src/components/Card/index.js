import { Card as RebassCard } from "rebass";

export default function Card(props) {
  return (
    <RebassCard
      sx={{
        px: 3,
        py: 2,
      }}
      {...props}
    />
  );
}
