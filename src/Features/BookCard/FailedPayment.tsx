import { ArrowLeftToLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const FailedPayment = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
            <div className="flex items-center mb-4">
                <ArrowLeftToLine className="h-6 w-6 text-red-500" aria-hidden="true" />
                <Link to="/dashboard/bookform" className="text-red-500 ml-2 text-lg font-semibold">
                    Go Back to Booking
                </Link>
            </div>
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-md text-center">
                <svg
                    className="h-16 w-16 text-red-500 mx-auto mb-4"
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
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
                    Payment Failed
                </h1>
                <p className="text-gray-700 text-lg">Something went wrong with your payment. Please try again.</p>
                <div className="mt-6">
                    <Link
                        to="/retry-payment"
                        className="inline-block bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                        Retry Payment
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FailedPayment;
