"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createInvoice } from "@/services/invoice.service";
import { getLeads } from "@/services/lead.service";
import InvoiceItemRow from "@/components/invoices/invoice-item-row";

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [leads, setLeads] = useState<any[]>([]);
  const [discount, setDiscount] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(18);
  const [items, setItems] = useState([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  useEffect(() => {
    getLeads({ limit: 100 })
      .then((res) => setLeads(res.data.leads || []))
      .catch(() => setLeads([]));
  }, []);

  const selectedLead = leads.find((lead) => lead._id === leadId);

  const addRow = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeRow = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [field]: value };
    setItems(copy);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.unitPrice),
    0,
  );
  const taxAmount = ((subtotal - discount) * taxPercentage) / 100;
  const total = subtotal - discount + taxAmount;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) {
      return toast.error("Please select a lead");
    }
    if (items.some((item) => !item.description || item.unitPrice <= 0)) {
      return toast.error("Please fill all item details with valid prices");
    }
    try {
      setLoading(true);
      const res = await createInvoice({
        leadId,
        discount,
        taxPercentage,
        items,
      });
      toast.success("Invoice created successfully");
      router.push(`/invoices/${res.data.invoice._id}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Create and send invoices to your customers.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {/* Client Selection */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Client Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Select Lead *
            </label>
            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a Lead --</option>
              {leads.map((lead: any) => (
                <option key={lead._id} value={lead._id}>
                  {lead.name} - {lead.company}
                </option>
              ))}
            </select>
          </div>

          {selectedLead && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="font-medium">{selectedLead.name}</span>
                </div>
                <div>
                  <span className="text-gray-500">Company:</span>{" "}
                  <span className="font-medium">{selectedLead.company}</span>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="font-medium">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-gray-500">Phone:</span>{" "}
                  <span className="font-medium">{selectedLead.phone}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Invoice Items</h2>
            <button
              type="button"
              onClick={addRow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <InvoiceItemRow
                key={index}
                item={item}
                index={index}
                updateItem={updateItem}
                onRemove={items.length > 1 ? () => removeRow(index) : undefined}
              />
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Discount (₹)
              </label>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tax (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Invoice Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span className="font-medium text-orange-600">
                - ₹{discount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax ({taxPercentage}%)</span>
              <span className="font-medium">
                ₹{taxAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/invoices")}
            className="border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm disabled:opacity-50 transition"
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}
