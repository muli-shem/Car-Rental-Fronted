import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from './userProfileSlice';
import { RootState, AppDispatch } from '../../app/Store'; // Adjust according to your store setup
import { UserProfile } from '../UserProfile/userProfileSlice'; // Adjust path as per your project structure

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string>(''); // Specify error state type
  const [editing, setEditing] = useState(false); // New state to handle editing
  const userProfile = useSelector((state: RootState) => state.userProfile); // Use RootState to access userProfile
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type

  useEffect(() => {
    // Fetch user profile data on component mount
    dispatch(fetchUserProfile());
  }, [dispatch]); // Dispatch dependency to ensure effect runs once

  useEffect(() => {
    // Set form fields with userProfile data on userProfile.data change
    if (userProfile.data) {
      setFullName(userProfile.data.fullName);
      setEmail(userProfile.data.email);
      setContactPhone(userProfile.data.contactPhone);
      setAddress(userProfile.data.address);
    }
  }, [userProfile.data]); // userProfile.data dependency to update form fields

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Dispatch updateUserProfile with updated profile data
      await dispatch(
        updateUserProfile({
          fullName,
          email,
          contactPhone,
          address,
        } as UserProfile) // Assert as UserProfile to ensure correct payload type
      );
      setEditing(false); // Exit edit mode on success
      // Optionally handle success UI or navigation
    } catch (err) {
      setError('Error updating profile. Please try again.'); // Handle update error
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">Profile</h2>
        {editing ? (
          <form className="space-y-6" onSubmit={handleUpdateProfile}>
            {/* Form inputs for profile fields */}
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                id="contact-phone"
                name="contact-phone"
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Contact Number"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Address"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update Profile
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex w-full justify-center mt-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div>
              <p className="text-sm font-medium text-gray-700">Full Name: {userProfile.data?.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email: {userProfile.data?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Contact Number: {userProfile.data?.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Address: {userProfile.data?.address}</p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex w-full justify-center mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
