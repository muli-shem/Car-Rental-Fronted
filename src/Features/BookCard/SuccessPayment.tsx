import { ArrowLeftToLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessPayment = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
            <div className="flex items-center mb-4">
                <ArrowLeftToLine className="h-6 w-6 text-green-500" aria-hidden="true" />
                <Link to="/dashboard/bookings" className="text-green-500 ml-2 text-lg font-semibold">
                    Check Your Booking
                </Link>
            </div>
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-md text-center">
                <svg
                    className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z"
                    />
                </svg>
                <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                    Payment Successful
                </h1>
                <p className="text-gray-700 text-lg">Thank you for your payment!</p>
            </div>
        </div>
    );
};

export default SuccessPayment;
