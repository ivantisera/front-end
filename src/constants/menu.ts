import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import DescriptionIcon from "@mui/icons-material/Description";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShieldIcon from "@mui/icons-material/Shield";
import WorkIcon from "@mui/icons-material/Work";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import BadgeIcon from "@mui/icons-material/Badge";
import GavelIcon from "@mui/icons-material/Gavel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiamondIcon from "@mui/icons-material/Diamond";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EventIcon from "@mui/icons-material/Event";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export type MenuItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export const dashboardItem: MenuItem = {
  label: "Dashboard",
  path: "/dashboard",
  icon: DashboardIcon,
};

export const menuGroups: MenuGroup[] = [
  {
    title: "PLANS & REPORTS",
    items: [
      { label: "End of Life Plans", path: "/plans", icon: AssignmentIcon },
      { label: "Family", path: "/plans-family", icon: GroupsIcon },
      { label: "Financial Overview", path: "/overview", icon: DescriptionIcon },
    ],
  },
  {
    title: "FAMILY ITEMS",
    items: [
      { label: "Family", path: "/family", icon: Diversity3Icon },
      { label: "Finances", path: "/finances", icon: AccountBalanceWalletIcon },
      { label: "Vehicles", path: "/vehicles", icon: DirectionsCarIcon },
      { label: "Insurance", path: "/insurance", icon: ShieldIcon },
      { label: "Work & Benefits", path: "/work-benefits", icon: WorkIcon },
      { label: "Health", path: "/health", icon: HealthAndSafetyIcon },
      { label: "Digital Life & Security", path: "/security", icon: BadgeIcon },
      { label: "Legal", path: "/legal", icon: GavelIcon },
      { label: "Tax", path: "/tax", icon: AttachMoneyIcon },
      { label: "Valuables", path: "/valuables", icon: DiamondIcon },
      { label: "End of Life", path: "/end-of-life", icon: EditNoteIcon },
    ],
  },
  {
    title: "OTHER",
    items: [
      { label: "Events", path: "/events", icon: EventIcon },
      { label: "Contacts", path: "/contacts", icon: ContactPageIcon },
    ],
  },
];
