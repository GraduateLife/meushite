import React from 'react';

type SwitchProps = {
  by: string;
  children: React.ReactNode;
};

type CaseProps = {
  condition: string;
  children: React.ReactNode;
};

const Switch = ({ by, children }: SwitchProps) => {
  let matched: React.ReactNode = null;
  let defaultCase: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === Switch.Case && child.props.condition === by) {
      matched = child;
    } else if (child.type === Switch.Default) {
      defaultCase = child;
    }
  });

  return matched ?? defaultCase;
};

Switch.Case = ({ children }: CaseProps) => {
  return <>{children}</>;
};

Switch.Default = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export { Switch };
