export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Shavim Platform. כל הזכויות שמורות.
      </div>
    </footer>
  );
}