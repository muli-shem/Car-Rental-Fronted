import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { ticketAPI, TTicket } from './ticketAPI';

function AllTicketsTable() {
  const { data: tickets, isLoading, isError, refetch } = ticketAPI.useGetAllTicketsQuery();
  const [updateTicket] = ticketAPI.useUpdateTicketMutation();

  const [editRow, setEditRow] = useState<number | null>(null);
  const [editableTicket, setEditableTicket] = useState<Partial<TTicket> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const handleEdit = (ticket: TTicket) => {
    setEditRow(ticket.ticket_id);
    setEditableTicket({ ...ticket });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditableTicket({ ...editableTicket, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (ticketId: number) => {
    if (!editableTicket) return;
    try {
      await updateTicket({ ...editableTicket, ticket_id: ticketId }).unwrap();
      toast.success('Ticket updated successfully');
      setEditRow(null);
      setEditableTicket(null);
    } catch (error) {
      toast.error('Error updating ticket');
    }
  };

  const handleCancel = () => {
    setEditRow(null);
    setEditableTicket(null);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto text-base-content bg-gray-800 rounded-lg p-4">
        <h1 className='text-xl my-4 text-white'>All Tickets</h1>
        <table className="table-auto w-full text-left text-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2" style={{ display: 'none' }}>ID</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Updated At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7} className="px-4 py-2 text-center">Loading...</td></tr>
            ) : isError ? (
              <tr><td colSpan={7} className="px-4 py-2 text-center">No Data</td></tr>
            ) : (
              tickets && tickets.map((ticket: TTicket) => (
                <tr key={ticket.ticket_id} className="bg-gray-800 even:bg-gray-700">
                  <td className="px-4 py-2" style={{ display: 'none' }}>{ticket.ticket_id}</td>
                  <td className="px-4 py-2">
                    {editRow === ticket.ticket_id ? (
                      <input
                        type="text"
                        name="subject"
                        value={editableTicket?.subject || ''}
                        onChange={handleChange}
                        className="w-full p-1 rounded"
                      />
                    ) : (
                      ticket.subject
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editRow === ticket.ticket_id ? (
                      <textarea
                        name="description"
                        value={editableTicket?.description || ''}
                        onChange={handleChange}
                        className="w-full p-1 rounded"
                      />
                    ) : (
                      ticket.description
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editRow === ticket.ticket_id ? (
                      <select
                        name="status"
                        value={editableTicket?.status || ''}
                        onChange={handleChange}
                        className="w-full p-1 rounded"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    ) : (
                      ticket.status
                    )}
                  </td>
                  <td className="px-4 py-2">{ticket.created_at}</td>
                  <td className="px-4 py-2">{ticket.updated_at}</td>
                  <td className='flex gap-2 px-4 py-2'>
                    {editRow === ticket.ticket_id ? (
                      <>
                        <button className='btn btn-sm btn-outline btn-success' onClick={() => handleUpdate(ticket.ticket_id)}>Save</button>
                        <button className='btn btn-sm btn-outline btn-error' onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <button className='btn btn-sm btn-outline btn-info' onClick={() => handleEdit(ticket)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllTicketsTable;
