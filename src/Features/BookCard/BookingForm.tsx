import React, { useState, useEffect } from 'react';
import { useAddPaymentMutation, useAddBookingMutation } from '../BookCard/bookingsAPI';

type BookingFormProps = {
  onBookingSuccess: () => void;
};


  
  // other properties if any
;

const BookingForm = ({ }: BookingFormProps) => {
  const [bookingDate, setBookingDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [addBooking, { isLoading: isBookingLoading, isError: isBookingError, error: bookingError }] = useAddBookingMutation();
  const [addPayment, { isLoading: isPaymentLoading, isError: isPaymentError, error: paymentError }] = useAddPaymentMutation();

  useEffect(() => {
    if (bookingDate && returnDate) {
      calculateTotalAmount();
    }
  }, [bookingDate, returnDate]);

  const calculateTotalAmount = () => {
    const rental_rate = localStorage.getItem('rental_rate');

    if (!rental_rate) {
      alert('Rental rate is not defined');
      return;
    }

    const start = new Date(bookingDate);
    const end = new Date(returnDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const amount = days * Number(rental_rate);
    setTotalAmount(amount * 100); // Convert to cents for Stripe
  };

  const handleBook = async (event: React.FormEvent) => {
    event.preventDefault();
    const user_id = localStorage.getItem('user_id');
    const vehicle_id = localStorage.getItem('vehicle_id');
    const vehicleId = Number(vehicle_id);
    if (!user_id || !vehicleId || !bookingDate || !returnDate) {
      alert('User, vehicle information or dates are missing');
      return;
    }

    const bookingData = {
      user_id: Number(user_id),
      vehicle_id: vehicleId,
      location_id: 8, // Replace with actual location ID
      booking_date: new Date(bookingDate).toISOString(),
      return_date: new Date(returnDate).toISOString(),
      total_amount: totalAmount,
    };

    try {
      const bookingResponse = await addBooking(bookingData).unwrap();
      console.log('Booking Response:', bookingResponse);

      if (Array.isArray(bookingResponse) && bookingResponse.length > 0 && bookingResponse[0].booking_id) {
        const bookingId = bookingResponse[0].booking_id;
        await handlePayment(totalAmount, bookingId);
      } else {
        throw new Error('Booking ID is missing in the response');
      }
    } catch (error: any) {
      console.error('Booking or payment failed:', error);
      alert(error.message);
    }
  };

  const handlePayment = async (amountToPay: number, bookingId: number) => {
    try {
      const paymentPayload = {
        booking_id: bookingId,
        amount: amountToPay,
        currency: 'kes', // Make sure to include currency
        transaction_id: 'sessionId', // Add appropriate transaction ID if needed
        payment_method: 'Card', // Example payment method ID
        payment_status: 'pending',
        url: '',
      };

      console.log('Payment Payload:', paymentPayload);
      const checkoutResponse = await addPayment(paymentPayload).unwrap();
      window.location.href = checkoutResponse.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <form onSubmit={handleBook} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="bookingDate">Booking Date</label>
        <input 
          id="bookingDate"
          type="date" 
          value={bookingDate} 
          onChange={(e) => setBookingDate(e.target.value)} 
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="returnDate">Return Date</label>
        <input 
          id="returnDate"
          type="date" 
          value={returnDate} 
          onChange={(e) => setReturnDate(e.target.value)} 
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Total Amount</label>
        <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">{(totalAmount / 100).toFixed(2)} KES</p>
      </div>
      <button 
        type="submit" 
        disabled={isBookingLoading || isPaymentLoading} 
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        {isBookingLoading || isPaymentLoading ? 'Processing...' : 'Book Now'}
      </button>
      {isBookingError && <p className="text-red-500 mt-4">Error: {(bookingError as Error).message}</p>}
      {isPaymentError && <p className="text-red-500 mt-4">Error: {(paymentError as Error).message}</p>}
    </form>
  );
};

export default BookingForm;
