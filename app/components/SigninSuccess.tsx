import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500'>
      <div className='bg-white rounded-md p-8'>
        <h2 className='text-2xl font-bold mb-4'>Success!</h2>
        <p>Your sign-in was successful.</p>
        <button
          className='mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
