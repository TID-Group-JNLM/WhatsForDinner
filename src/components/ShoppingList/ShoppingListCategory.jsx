import {
  Stack,
  Typography,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";

function roundAmount(amount) {
  return Math.round(amount * 10) / 10;
}

// One category heading with its items. Ticked items stay where they are, but are greyed out
export default function ShoppingListCategory({ label, items, onToggle }) {
  return (
    <Stack component="section" spacing={1}>
      <Typography variant="h6" component="h2"> 
        {label}
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem
            component="label"
            key={item.id}
            divider
            disableGutters
            sx={{ justifyContent: "space-between" }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Checkbox
                checked={item.checked}
                onChange={(event) => onToggle(item.id, event.target.checked)}
              />

              <Typography
                sx={{
                  textDecoration: item.checked ? "line-through" : "none",
                  color: item.checked ? "text.secondary" : "text.primary",
                }}
              >
                {item.name}
              </Typography>
            </Stack>

            <Typography sx={{ color: "text.secondary" }}>
              {roundAmount(item.amount)} {item.unit}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
