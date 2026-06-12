"use client";

export default function InvoiceItemsTable({ items }: { items: any[] }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        shadow-sm
        overflow-hidden
      "
    >
      <div
        className="
          px-6
          py-5
          border-b
          bg-linear-to-r
          from-slate-50
          to-gray-100
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-gray-900
          "
        >
          Invoice Items
        </h2>

        <p
          className="
            text-sm
            text-gray-500
            mt-1
          "
        >
          Total Items: {items.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              bg-gray-50
              border-b
            "
          >
            <tr>
              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Description
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-center
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Quantity
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Unit Price
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                Line Total
              </th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={index}
                  className="
                    border-b
                    last:border-b-0
                    hover:bg-blue-50/40
                    transition-colors
                  "
                >
                  <td className="px-6 py-5">
                    <div>
                      <p
                        className="
                          font-semibold
                          text-gray-900
                        "
                      >
                        {item.description}
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        Item #{index + 1}
                      </p>
                    </div>
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-center
                    "
                  >
                    <span
                      className="
                        inline-flex
                        items-center
                        justify-center
                        h-9
                        min-w-9
                        px-3
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        font-semibold
                      "
                    >
                      {item.quantity}
                    </span>
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                      font-medium
                      text-gray-700
                    "
                  >
                    ₹{Number(item.unitPrice).toLocaleString("en-IN")}
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                    "
                  >
                    <span
                      className="
                        font-bold
                        text-green-600
                        text-lg
                      "
                    >
                      ₹{Number(item.lineTotal).toLocaleString("en-IN")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="
                    py-14
                    text-center
                  "
                >
                  <div className="space-y-2">
                    <div className="text-5xl">📦</div>

                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-gray-700
                      "
                    >
                      No Items Added
                    </h3>

                    <p className="text-gray-500">
                      Invoice items will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {items.length > 0 && (
            <tfoot
              className="
                bg-gray-50
                border-t
              "
            >
              <tr>
                <td
                  colSpan={3}
                  className="
                    px-6
                    py-4
                    text-right
                    font-semibold
                    text-gray-700
                  "
                >
                  Grand Total
                </td>

                <td
                  className="
                    px-6
                    py-4
                    text-right
                    text-xl
                    font-bold
                    text-green-600
                  "
                >
                  ₹
                  {items
                    .reduce((sum, item) => sum + Number(item.lineTotal), 0)
                    .toLocaleString("en-IN")}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
