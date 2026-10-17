import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import FloatButton from '../components/ChatBot/FloatButton';

export default function Layout(props: React.ComponentProps<typeof OriginalLayout>): React.JSX.Element {
  const { children, ...layoutProps } = props;
  return (
    <OriginalLayout {...layoutProps}>
      {children}
      <FloatButton />
    </OriginalLayout>
  );
}
