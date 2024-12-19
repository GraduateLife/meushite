import React from 'react';

type IfProps = {
  condition: boolean;
  children: React.ReactNode;
};

type ElseIfProps = {
  condition: boolean;
  children: React.ReactNode;
};

type ElseProps = {
  children: React.ReactNode;
};

const If = ({ condition, children }: IfProps) => {
  let elseIfChild: React.ReactNode | null = null;
  let elseChild: React.ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === ElseIf) {
      if (!elseIfChild && !condition && child.props.condition) {
        elseIfChild = child.props.children;
      }
    } else if (child.type === Else) {
      elseChild = child.props.children;
    }
  });

  if (condition) {
    return <>{children}</>;
  }

  if (elseIfChild) {
    return <>{elseIfChild}</>;
  }

  if (elseChild) {
    return <>{elseChild}</>;
  }

  return null;
};

const ElseIf = ({ condition, children }: ElseIfProps) => {
  return null; // This component is just a marker, rendering is handled by If
};

const Else = ({ children }: ElseProps) => {
  return null; // This component is just a marker, rendering is handled by If
};

export { If, ElseIf, Else };
