
// import { useGetTicketsByUserIdQuery, useUpdateTicketMutation, useDeleteTicketMutation, TTicket } from './ticketAPI';
import { Toaster, toast } from 'sonner';
import { ticketAPI, TTicket } from './ticketAPI';

function TicketTable() {
  const Id = localStorage.getItem('user_id') 
  const userId = Number(Id)
  console.log(userId)
  const { data: tickets, isLoading, isError } = ticketAPI.useGetTicketByIdQuery(userId)
  const [updateTicket] = ticketAPI.useUpdateTicketMutation()
  const [deleteTicket, { isLoading: isDeleting }] = ticketAPI.useDeleteTicketMutation()

  const handleUpdate = async (ticket: Partial<TTicket>) => {
    try {
      const updatedTicket = await updateTicket(ticket);
      toast.success('Ticket updated successfully');
      console.log('Updated ticket:', updatedTicket);
    } catch (error) {
      toast.error('Error updating ticket');
    }
  };

  const handleDelete = async (ticketId: number) => {
    try {
      await deleteTicket(ticketId);
       
        toast.success('Ticket deleted successfully');
        toast.success(isDeleting);
      
    } catch (error:any) {
      toast.error('Error deleting ticket');
    }
  }
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
        <table className="table-auto w-full text-left text-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">ID</th>
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
              tickets && tickets.map((ticket: TTicket, index: number) => (
                <tr key={index} className="bg-gray-800 even:bg-gray-700">
                  <td className="px-4 py-2">{ticket.ticket_id}</td>
                  <td className="px-4 py-2">{ticket.subject}</td>
                  <td className="px-4 py-2">{ticket.description}</td>
                  <td className="px-4 py-2">{ticket.status}</td>
                  <td className="px-4 py-2">{ticket.created_at}</td>
                  <td className="px-4 py-2">{ticket.updated_at}</td>
                  <td className='flex gap-2 px-4 py-2'>
                    <button className='btn btn-sm btn-outline btn-info' onClick={() => handleUpdate({ ...ticket, status: 'Updated' })}>Update</button>
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
