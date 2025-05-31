import { Box, IconButton, Typography } from "@mui/material";
import { Close, Email, Phone } from "@mui/icons-material";
import { Contact } from "@/features/contacts/api/types";
import LPPersonAvatar from "./LPPersonAvatar";

interface ContactCardProps {
  contact: Contact;
  onRemove?: (gid: string) => void;
}

export default function ContactCard({ contact, onRemove }: ContactCardProps) {
  return (
    <Box
      sx={{
        width: 240,
        height: 120,
        border: "1px solid",
        borderColor: "custom.inputBorder",
        borderRadius: 1,
        bgcolor: "background.paper",
        padding: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <LPPersonAvatar
            gid={contact.gid}
            firstName={contact.firstName || ""}
            lastName={contact.lastName || ""}
            initials={contact.initials || ""}
            imageUrl={contact.imageUrl}
            size={32}
          />
          <Typography variant="body2" fontWeight={600} noWrap>
            {`${contact.firstName || ""} ${contact.lastName || ""}`.trim()}
          </Typography>
        </Box>
        <IconButton
          onClick={() => onRemove?.(contact.gid)}
          size="small"
          sx={{ padding: 0.5 }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>

      {contact.phone && (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone sx={{ color: "text.secondary", fontSize: 16 }} />
          <Typography variant="body2" color="text.secondary">
            {contact.phone}
          </Typography>
        </Box>
      )}

      {contact.email && (
        <Box display="flex" alignItems="center" gap={1}>
          <Email sx={{ color: "text.secondary", fontSize: 16 }} />
          <Typography variant="body2" color="text.secondary">
            {contact.email}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
