import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { getContacts } from "../api/requests";
import { Contact } from "../api/types";
import LPGenericTable from "@/ui/components/common/LPGenericTable";
import LPLoader from "@/ui/components/feedback/LPLoader";
import GenericErrorMessage from "@/ui/components/feedback/GenericErrorMessage";
import ContactForm from "./ContactForm";
import EmptyState from "@/ui/components/feedback/EmptyState";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SearchInput from "@/ui/components/common/SearchInput";

type Props = {
  open: boolean;
  excludedGids?: string[];
  onClose: () => void;
  onConfirm: (contacts: Contact[]) => void;
};

export default function ContactPicker({
  open,
  onClose,
  onConfirm,
  excludedGids = [],
}: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    data: contacts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    enabled: open,
  });

  useEffect(() => {
    if (open) {
      setSearch("");
      setShowCreate(false);
      setSelected([]);

      // Enfocar el modal al abrir
      setTimeout(() => {
        dialogRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const filteredContacts = useMemo(() => {
    return contacts
      .filter((c) => !excludedGids.includes(c.gid))
      .filter((c) => {
        const text = search.toLowerCase();
        return (
          c.firstName?.toLowerCase().includes(text) ||
          c.lastName?.toLowerCase().includes(text) ||
          c.company?.toLowerCase().includes(text) ||
          c.initials?.toLowerCase().includes(text)
        );
      });
  }, [contacts, search, excludedGids]);

  const handleConfirm = () => {
    onConfirm(selected);
    setSelected([]);
    onClose();
  };

  const handleCreatedContact = (newContact: Contact) => {
    setSelected((prev) => [...prev, newContact]);
    setShowCreate(false);
    refetch();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {showCreate ? "Create Contact" : "Select Contact(s)"}
        <Divider sx={{ my: 1 }} />
      </DialogTitle>

      <DialogContent sx={{ minHeight: 300 }}>
        <div ref={dialogRef} tabIndex={-1} style={{ outline: "none" }}>
          {showCreate ? (
            <ContactForm
              onCancel={() => setShowCreate(false)}
              onSuccess={handleCreatedContact}
            />
          ) : (
            <Stack spacing={2}>
              <SearchInput value={search} onChange={setSearch} />

              {isLoading && <LPLoader />}
              {isError && (
                <GenericErrorMessage error={error} onRetry={refetch} />
              )}
              {!isLoading &&
                !isError &&
                (filteredContacts.length > 0 ? (
                  <LPGenericTable
                    data={filteredContacts}
                    selectedRows={selected}
                    onSelectionChange={setSelected}
                    columns={[
                      {
                        label: "First Name",
                        render: (c) => c.firstName || "-",
                      },
                      { label: "Last Name", render: (c) => c.lastName || "-" },
                      { label: "Company", render: (c) => c.company || "-" },
                      { label: "Email", render: (c) => c.email || "-" },
                    ]}
                  />
                ) : (
                  <EmptyState
                    title="No contacts available"
                    description="Try adjusting your search or create a new contact."
                    icon={
                      <PersonOffIcon
                        sx={{ fontSize: 48, color: "text.secondary" }}
                      />
                    }
                  />
                ))}

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button onClick={() => setShowCreate(true)}>
                  + Create new contact
                </Button>
              </Box>
            </Stack>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={selected.length === 0}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
