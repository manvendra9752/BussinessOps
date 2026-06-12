import { Trash2 } from "lucide-react";

interface Props {
  item: any;
  index: number;
  updateItem: (index: number, field: string, value: any) => void;
  onRemove?: () => void;
}

export default function InvoiceItemRow({
  item,
  index,
  updateItem,
  onRemove,
}: Props) {
  const amount = Number(item.quantity || 0) * Number(item.unitPrice || 0);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          Item #{index + 1}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-blue-600">
            ₹{amount.toLocaleString("en-IN")}
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-red-400 hover:text-red-600 transition"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-6">
          <input
            type="text"
            placeholder="Item description"
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-3">
          <input
            type="number"
            min="1"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) =>
              updateItem(index, "quantity", Number(e.target.value))
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-3">
          <input
            type="number"
            min="0"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) =>
              updateItem(index, "unitPrice", Number(e.target.value))
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
