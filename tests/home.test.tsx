import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '../app/page';
import React from 'react';

vi.mock('@clerk/nextjs', () => {
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) => resolve({ userId: 'user_knsdcnadkcjnadc' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_knsdcnadkcjnadc',
        fullName: 'Random Name',
      },
    }),
  };
  return mockedFunctions;
});

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  };
});

test('Home', async () => {
  render(await Home());
  expect(screen.getByText('get started')).toBeTruthy();
});
