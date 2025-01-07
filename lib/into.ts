export function into<T>(parts: number) {
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
