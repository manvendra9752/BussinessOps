export default function EmptyState({ title }: { title: string }) {
  return (
    <div
      className="
      border
      p-8
      rounded
      text-center"
    >
      {title}
    </div>
  );
}
