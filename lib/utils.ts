import { type ClassValue, clsx } from 'clsx';
import path from 'path';
import { twMerge } from 'tailwind-merge';

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
