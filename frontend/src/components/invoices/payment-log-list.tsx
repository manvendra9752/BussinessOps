interface Props {
  logs: any[];
}

export default function PaymentLogList({ logs }: Props) {
  if (!logs?.length) {
    return <div>No payment logs</div>;
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log._id}
          className="
            border
            rounded
            p-3"
        >
          <p>
            Status:
            {log.status}
          </p>

          <p>Amount: ₹{log.payload?.amount ?? "—"}</p>

          <p>{new Date(log.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
