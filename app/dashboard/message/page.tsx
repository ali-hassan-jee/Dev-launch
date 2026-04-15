// app/message/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import ContactTable from "@/components/ContactTable";
import { Contact, ApiResponse } from "@/types/contact";
import ContactModal from "@/components/ui/ContactModal";

export default function MessagePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [updating, setUpdating] = useState(false); // update

  const handleEdit = async (selectedContact) => {
    setMessage(null)
    setIsOpen(true);
    setSelectedRow(selectedContact);
  };
  const updateContact = async () => {
    setUpdating(true);
    setError(null);
    setMessage(null);
    const res = await fetch(`/api/contact/${selectedRow._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedRow),
    });
if (!res.ok) {
  throw new Error("Failed to update");
}
    const result = await res.json();
    console.log("result     ", contacts);
    if (result.success) {
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === selectedRow._id ? result.data : contact,
        ),
      );
      setMessage(result.message);
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } else {
      setError(result.error || "Update failed");
    }
    setUpdating(false);
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete message`)) {
      return;
    }
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success)
        setContacts((prev) => {
          const updated = prev.filter((c) => c._id !== id);
          setCount(updated.length);
          return updated;
        });
    } catch {}
  };

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Use absolute path - fix from "../../api/contact" to "/api/contact"
      const res = await fetch("/api/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result: ApiResponse = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setContacts(result.data);
        setCount(result.count);
      } else {
        throw new Error(result.error || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-red-800 font-semibold">
                  Error loading messages
                </h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={fetchContacts}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600">
            Manage and view all messages submitted through your contact form
          </p>
          <div className="mt-2 h-1 w-20 bg-blue-500 rounded"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Last 30 Days</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    contacts.filter((c) => {
                      if (!c.createdAt) return false;
                      const date = new Date(c.createdAt);
                      const thirtyDaysAgo = new Date();
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                      return date >= thirtyDaysAgo;
                    }).length
                  }
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">With Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table Component */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ContactTable
            data={contacts}
            loading={loading}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
        {isOpen && (
          <ContactModal
            isOpen={isOpen}
            selectedRow={selectedRow}
            updateContact={updateContact}
            loading={updating}
            message={message}
            error={error}
            onClose={() => {
              setIsOpen(false);
            }}
            setSelectedRow={setSelectedRow}
          />
        )}
      </div>
    </div>
  );
}
