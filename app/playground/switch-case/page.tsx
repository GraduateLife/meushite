'use client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/util/SwitchCase';
import React, { useState } from 'react';

const Page = () => {
  const [num, setNum] = useState(0);
  return (
    <div className="w-[600px] flex flex-col items-center justify-center gap-y-4">
      <div>Switch case test</div>
      <Button
        onClick={() => {
          setNum((_old) => _old + 1);
        }}
      >
        {num}
      </Button>
      <Switch by={num.toString()}>
        <Switch.Case condition="1">
          <div>I am condition 1</div>
        </Switch.Case>
        <Switch.Case condition="2">
          <div>I am condition 2</div>
        </Switch.Case>
        <Switch.Case condition="6">
          <div>I am condition 6</div>
        </Switch.Case>
        <Switch.Default>
          <div>I am condition default</div>
        </Switch.Default>
      </Switch>
    </div>
  );
};

export default Page;
