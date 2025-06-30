import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('מציג טקסט ומגיב ללחיצה', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>לחץ כאן</Button>);
    const btn = screen.getByRole('button', { name: 'לחץ כאן' });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });
}); 