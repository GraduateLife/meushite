import React from 'react';

type SwitchProps = {
  condition: string;
  children: React.ReactNode;
};

type CaseProps = {
  condition: string;
  children: React.ReactNode;
};

const Switch = ({ condition, children }: SwitchProps) => {
  let matchingChild: React.ReactNode | null = null;
  let defaultCase: React.ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === Switch.Case && child.props.condition === condition) {
      matchingChild = child;
    } else if (child.type === Switch.Default) {
      defaultCase = child;
    }
  });

  return matchingChild || defaultCase;
};

Switch.Case = ({ children }: CaseProps) => {
  return <>{children}</>;
};

Switch.Default = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export { Switch };
