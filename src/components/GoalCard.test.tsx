import { render, screen } from '@testing-library/react';
import GoalCard from './GoalCard';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('GoalCard', () => {
  it('renders goal name and progress', () => {
    renderWithRouter(
      <GoalCard
        id='1'
        name='Vacation'
        currentAmount={250}
        targetAmount={1000}
      />
    );

    expect(screen.getByText('Vacation')).toBeInTheDocument();
    expect(screen.getByText(/£250.00 of £1000.00/)).toBeInTheDocument();
  });

  it('shows completed badge if goal is complete', () => {
    renderWithRouter(
      <GoalCard
        id='1'
        name='Holiday'
        currentAmount={1000}
        targetAmount={1000}
      />
    );

    expect(screen.getByText('🎉 Completed')).toBeInTheDocument();
  });
});
