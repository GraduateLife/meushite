import { type ClassValue, clsx } from 'clsx';
import path from 'path';
import { twMerge } from 'tailwind-merge';
import { echo } from './echo';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filepathToSlug(filepath: string) {
  return path.basename(path.dirname(filepath));
}

export function slugToTitle(text: string): string {
  return text
    .split('-')
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

export function sentenceToTitle(text: string) {
  return text
    .split(' ')
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

export function ArrayInto<T>(parts: number) {
  if (!Number.isInteger(parts) || parts <= 0) {
    throw new Error('Number of parts must be a positive integer');
  }

  return (array: T[]): T[][] => {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }

    if (!array.length) {
      return Array.from({ length: parts }, () => []);
    }

    if (parts > array.length) {
      throw new Error('Number of parts is greater than array length');
    }

    const chunkSize = Math.ceil(array.length / parts);

    return Array.from({ length: parts }, (_, index) => {
      const start = index * chunkSize;
      const end = start + chunkSize;
      return array.slice(start, end);
    });
  };
}

const MAX_RETRIES = 3;
const INITIAL_DELAY = 2000; // 1 second

export const isTimeoutError = (error: Error) => {
  return (
    error?.name === 'TimeoutError' || error?.message?.includes('ECONNRESET')
  );
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  canRetry: (error: Error) => boolean,
  retryCount: number = 0
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retryCount < MAX_RETRIES && canRetry(error as Error)) {
      const delay = INITIAL_DELAY * Math.pow(2, retryCount);
      echo.info(
        `Retrying in ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return withRetry(operation, canRetry, retryCount + 1);
    }
    echo.error(`Failed after ${retryCount} retries: ${error}`);
    throw error;
  }
}
