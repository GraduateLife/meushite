import React from 'react';

type ForProps<T> =
  | {
      each: T[];
      children: (item: T, index: number) => React.ReactNode;
    }
  | {
      from: number;
      to: number;
      step?: number;
      children: (index: number) => React.ReactNode;
    };

function For<T>(props: ForProps<T>): React.ReactElement | null {
  // Array iteration case
  if ('each' in props) {
    return <>{props.each.map((item, index) => props.children(item, index))}</>;
  }

  // Numeric iteration case
  const { from, to, step = 1, children } = props;
  const items: React.ReactNode[] = [];

  for (let i = from; i < to; i += step) {
    items.push(children(i));
  }

  return <>{items}</>;
}

export { For };
