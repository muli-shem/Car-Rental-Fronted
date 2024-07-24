import { Toaster, toast } from 'sonner';
import { bookingAPI, TBookings } from './BookingAPI';

function AllBookingsTable() {
    const { data: bookings, isLoading, isError } = bookingAPI.useGetBookingsQuery();
    const [deleteBooking, {  data: deletemsg }] = bookingAPI.useDeleteBookingMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteBooking(id);
            toast.success('Booking deleted successfully');
        } catch (error) {
            toast.error('Error deleting booking');
        }
    }

    console.log(deletemsg);

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
                <h1 className='text-xl my-4 text-white'>All Bookings</h1>
                <table className="table-auto w-full text-left text-gray-200">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Location ID</th>
                            <th className="px-4 py-2">Booking Date</th>
                            <th className="px-4 py-2">Return Date</th>
                            <th className="px-4 py-2">Total Amount</th>
                            <th className="px-4 py-2">Booking Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={7} className="px-4 py-2 text-center">Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={7} className="px-4 py-2 text-center">No Data</td></tr>
                        ) : (
                            bookings && bookings.map((booking: TBookings, index: number) => (
                                <tr key={index} className="bg-gray-800 even:bg-gray-700">
                                    <td className="px-4 py-2">{booking.booking_id}</td>
                                    <td className="px-4 py-2">{booking.location_id}</td>
                                    <td className="px-4 py-2">{booking.booking_date}</td>
                                    <td className="px-4 py-2">{booking.return_date}</td>
                                    <td className="px-4 py-2">{booking.total_amount}</td>
                                    <td className="px-4 py-2">{booking.booking_status}</td>
                                    <td className='flex gap-2 px-4 py-2'>
                                        <button className='btn btn-sm btn-outline btn-info'>Update</button>
                                        <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(booking.booking_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={7} className="px-4 py-2 text-center">{bookings ? `${bookings.length} records` : '0 records'}</td></tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}

export default AllBookingsTable;
