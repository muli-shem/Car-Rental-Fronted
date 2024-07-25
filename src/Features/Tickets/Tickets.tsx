import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { ticketAPI, TTicket } from './ticketAPI';

function TicketTable() {
  const Id = localStorage.getItem('user_id');
  const userId = Number(Id);
  console.log(userId);

  const { data: tickets, isLoading, isError, refetch } = ticketAPI.useGetTicketByIdQuery(userId);
  const [createTicket] = ticketAPI.useCreateTicketMutation();
  const [deleteTicket] = ticketAPI.useDeleteTicketMutation();

  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    status: 'Open'
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      refetch();
    }
  }, [isLoading, isError, refetch]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const createdTicket = await createTicket({ ...newTicket, user_id: userId }).unwrap();
      toast.success('Ticket created successfully');
      console.log('Created ticket:', createdTicket);
      setNewTicket({ subject: '', description: '', status: 'Open' });
      refetch(); // Refresh the data
    } catch (error) {
      toast.error('Error creating ticket');
    }
  };

  const handleDelete = async (ticketId: number) => {
    try {
      await deleteTicket(ticketId).unwrap();
      toast.success('Ticket deleted successfully');
      refetch(); // Refresh the data
    } catch (error: any) {
      toast.error('Error deleting ticket');
    }
  };

  console.log(tickets);

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
        <h1 className='text-xl my-4 text-white'>Tickets</h1>
        <form onSubmit={handleCreate} className="mb-4">
          <div className="mb-2">
            <label className="block text-white">Subject</label>
            <input
              type="text"
              className="w-full p-2 rounded"
              value={newTicket.subject}
              onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-white">Description</label>
            <textarea
              className="w-full p-2 rounded"
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-white">Status</label>
            <select
              className="w-full p-2 rounded"
              value={newTicket.status}
              onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
              required
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-sm btn-outline btn-success">Create Ticket</button>
        </form>
        <table className="table-auto w-full text-left text-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2" style={{ display: 'none' }}>ID</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2" style={{ display: 'none' }}>Created At</th>
              <th className="px-4 py-2" style={{ display: 'none' }}>Updated At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7} className="px-4 py-2 text-center">Loading...</td></tr>
            ) : isError ? (
              <tr><td colSpan={7} className="px-4 py-2 text-center">No Data</td></tr>
            ) : (
              tickets && tickets.map((ticket: TTicket, index: number) => (
                <tr key={index} className="bg-gray-800 even:bg-gray-700">
                  <td className="px-4 py-2" style={{ display: 'none' }}>{ticket.ticket_id}</td>
                  <td className="px-4 py-2">{ticket.subject}</td>
                  <td className="px-4 py-2">{ticket.description}</td>
                  <td className="px-4 py-2">{ticket.status}</td>
                  <td className="px-4 py-2" style={{ display: 'none' }}>{ticket.created_at}</td>
                  <td className="px-4 py-2" style={{ display: 'none' }}>{ticket.updated_at}</td>
                  <td className='flex gap-2 px-4 py-2'>
                    <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(ticket.ticket_id)}>Delete</button>
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

export default TicketTable;
