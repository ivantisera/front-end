import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

/**
 * Deeply converts keys from snake_case to camelCase.
 */
export function toCamelCase<T>(
  data: Record<string, unknown> | Record<string, unknown>[]
): T {
  return camelcaseKeys(data, { deep: true }) as T;
}

/**
 * Deeply converts keys from camelCase to snake_case.
 */
export function toSnakeCase<T>(
  data: T
): Record<string, unknown> | Record<string, unknown>[] {
  return snakecaseKeys(data as Record<string, unknown>, { deep: true });
}

/**
 * Replace empty strings with undefined.
 */
export function removeEmptyStrings<T extends object>(obj: T): T {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    const k = key as keyof T;
    if (result[k] === "") {
      (result as unknown as Record<keyof T, unknown>)[k] = undefined;
    }
  });

  return result;
}

/**
 * Replace empty strings with null.
 */
export function normalizeEmptyStringsToNull<T extends Record<string, unknown>>(
  obj: T
): T {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === "" ? null : v])
  ) as T;
}

/**
 * Recursively removes null values from an object or array.
 */
export function removeNulls<T extends Record<string, unknown>>(data: T): T {
  const cleanData = {} as Record<keyof T, unknown>;

  for (const key in data) {
    const value = data[key];

    if (Array.isArray(value)) {
      cleanData[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? removeNulls(item as Record<string, unknown>)
          : item
      );
    } else if (value !== null) {
      cleanData[key] =
        typeof value === "object"
          ? removeNulls(value as Record<string, unknown>)
          : value;
    }
  }

  return cleanData as T;
}
