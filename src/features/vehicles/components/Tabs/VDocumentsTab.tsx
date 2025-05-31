import EmptyState from "@/ui/components/feedback/EmptyState";

export default function VDocumentsTab() {
  return (
    <EmptyState
      title="No documents found"
      description="Don't forget to add them. It's too important."
      primaryAction={{
        label: "+ Add Document",
        onClick: () => console.log("add"),
      }}
      secondaryAction={{
        label: "Try another thing",
        onClick: () => console.log("Try another thing"),
      }}
    />
  );
}
