import { render, screen } from '@testing-library/react';
import ConceptSimulationWrapper from '../ConceptSimulationWrapper';

describe('ConceptSimulationWrapper', () => {
  it('returns null for unknown concept ids', () => {
    const { container } = render(
      <ConceptSimulationWrapper conceptId="unknown-id" conceptTitle="Unknown" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the simulation component for known ids', () => {
    render(
      <ConceptSimulationWrapper conceptId="data-cleansing" conceptTitle="Data Cleansing" />
    );
    // ensure a component with "Data Cleansing" text is rendered
    expect(screen.getAllByText(/Data Cleansing/i).length).toBeGreaterThan(0);
  });
});
