export function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="mb-4 border border-bronze/40 bg-card px-4 py-3 text-sm text-bronze">
      {message}
    </p>
  );
}
