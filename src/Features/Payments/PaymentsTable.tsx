// src/components/PaymentsTable.tsx
import React, { useState } from 'react';
import { Payment, paysAPI } from '../Payments/paysAPI';
import { toast } from 'sonner';

const PaymentsTable: React.FC = () => {
  const { data: payments, isLoading, error, refetch } = paysAPI.useGetPaymentsQuery();
  const [deletePayment] = paysAPI.useDeletePaymentMutation();
  const [filterStatus, setFilterStatus] = useState('');

  const handleDelete = async (payment_id: number) => {
    try {
      await deletePayment(payment_id).unwrap();
      toast.success('Payment deleted successfully');
      refetch(); // Refetch the payments data after deletion
    } catch (error) {
      toast.error('Failed to delete payment');
    }
  };

  const filteredPayments = payments?.filter((payment: Payment) => 
    filterStatus === '' || payment.payment_status === filterStatus
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading payments</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Filter by Payment Status
        </label>
        <select
          id="status"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPayments?.map((payment: Payment) => (
            <tr key={payment.payment_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.payment_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.payment_status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleDelete(payment.payment_id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
