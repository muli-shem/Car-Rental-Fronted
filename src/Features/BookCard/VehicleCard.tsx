
import BookingForm from './BookingForm';

const BookingFormWrapper = () => {
  const handleBookingSuccess = () => {
    alert('Booking successful!');
  };

  return <BookingForm onBookingSuccess={handleBookingSuccess} />;
};

export default BookingFormWrapper;
