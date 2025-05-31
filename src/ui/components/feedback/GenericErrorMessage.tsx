"use client";

import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { ValidationErrorResponse } from "@/types/errors";

type GenericErrorMessageProps = {
  error: string | Error | AxiosError | null | undefined;
  onRetry?: () => void;
};

export default function GenericErrorMessage({
  error,
  onRetry,
}: GenericErrorMessageProps) {
  let messages: string[] = [];

  if (!error) {
    messages = ["An unknown error occurred."];
  } else if (typeof error === "string") {
    messages = [error];
  } else if (error instanceof AxiosError) {
    if (error.response?.status === 422) {
      const data = error.response.data as ValidationErrorResponse;
      messages = data.detail.map((d) => d.msg);
    } else if (typeof error.response?.data === "string") {
      messages = [error.response.data];
    } else if (error.message) {
      messages = [error.message];
    }
  } else if (error instanceof Error) {
    messages = [error.message];
  } else {
    messages = ["An unknown error occurred."];
  }

  return (
    <Stack spacing={2}>
      <Alert severity="error">
        <AlertTitle>Oops! Something went wrong</AlertTitle>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </Alert>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Stack>
  );
}
