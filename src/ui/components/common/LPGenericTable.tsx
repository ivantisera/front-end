import React from "react";
import { Box, useTheme } from "@mui/material";

export type Column<T> = {
  label: string;
  render: (item: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  selected?: T;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
  onRowClick?: (item: T) => void;
};

export default function LPGenericTable<T extends { gid: string }>({
  data,
  columns,
  selected,
  selectedRows,
  onSelectionChange,
  onRowClick,
}: Props<T>) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.04)",
        bgcolor: theme.palette.background.paper,
      }}
    >
      <table
        style={{
          width: "100%",
          fontSize: 14,
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: theme.palette.custom.tableHeader }}>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 600,
                  fontSize: 12,
                  color: theme.palette.text.secondary,
                  letterSpacing: "0.02em",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const isSelected =
              selected?.gid === item.gid ||
              selectedRows?.some((row) => row.gid === item.gid);

            const handleClick = () => {
              if (onSelectionChange) {
                if (isSelected) {
                  onSelectionChange(
                    selectedRows!.filter((r) => r.gid !== item.gid)
                  );
                } else {
                  onSelectionChange([...(selectedRows || []), item]);
                }
              } else {
                onRowClick?.(item);
              }
            };

            return (
              <tr
                key={item.gid}
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? theme.palette.custom.tableRowSelected
                    : theme.palette.background.paper,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  transition: "background-color 0.2s",
                }}
              >
                {columns.map((col, i) => (
                  <td key={i} style={{ padding: "12px 16px" }}>
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}
