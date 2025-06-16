import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GarchModelSimulation from './GarchModelSimulation';
import { Toaster } from '@/components/ui/toaster';

it('shows toast when alpha + beta >= 1', async () => {
  render(
    <>
      <Toaster />
      <GarchModelSimulation initialAlpha={0.6} initialBeta={0.5} />
    </>
  );

  await userEvent.click(screen.getByText('Generate Data'));

  expect(
    await screen.findByText(/alpha \+ beta must be less than 1/i)
  ).toBeInTheDocument();
});
