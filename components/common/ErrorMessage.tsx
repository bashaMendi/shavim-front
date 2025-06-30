interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = 'אירעה שגיאה' }: ErrorMessageProps) {
  return <div className="text-red-500 py-4">{message}</div>;
}
