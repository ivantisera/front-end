"use client";

import CustomTabs, { TabData } from "@/ui/components/common/CustomTabs";
import LPLoader from "@/ui/components/feedback/LPLoader";
import dynamic from "next/dynamic";

const VItemsTab = dynamic(() => import("./Tabs/VItemsTab"), {
  loading: () => <LPLoader />,
});
const VNotesTab = dynamic(() => import("./Tabs/VNotesTab"), {
  loading: () => <LPLoader />,
});
const VEventsTab = dynamic(() => import("./Tabs/VEventsTab"), {
  loading: () => <LPLoader />,
});
const VContactsTab = dynamic(() => import("./Tabs/VContactsTab"), {
  loading: () => <LPLoader />,
});

const VDocumentsTab = dynamic(() => import("./Tabs/VDocumentsTab"), {
  loading: () => <LPLoader />,
});

const VCredentialsTab = dynamic(() => import("./Tabs/VCredentialsTab"), {
  loading: () => <LPLoader />,
});

export default function ClientTabsWrapper() {
  const tabs: TabData[] = [
    { label: "Items", content: () => <VItemsTab /> },
    { label: "Notes", count: 19, content: () => <VNotesTab /> },
    { label: "Events", count: 4, content: () => <VEventsTab /> },
    { label: "Contacts", count: 4, content: () => <VContactsTab /> },
    { label: "Documents", count: 0, content: () => <VDocumentsTab /> },
    { label: "Credentials", count: 4, content: () => <VCredentialsTab /> },
  ];

  return <CustomTabs tabs={tabs} />;
}
