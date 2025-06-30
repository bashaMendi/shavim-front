import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('מציג spinner או טקסט טעינה', () => {
    render(<Loader />);
    // אפשר לבדוק לפי aria-label, טקסט, או className
    // כאן נניח שיש aria-label="loader"
    expect(screen.getByLabelText(/loader/i)).toBeInTheDocument();
  });
}); 