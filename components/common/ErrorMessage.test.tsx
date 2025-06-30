import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('מציג את ההודעה שהועברה בפרופס', () => {
    render(<ErrorMessage message="שגיאה קריטית" />);
    expect(screen.getByText('שגיאה קריטית')).toBeInTheDocument();
  });
}); 