
const CustomModal = ({ isOpen, onClose }: {isOpen: boolean, onClose: () => void}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-8 z-10">
            <div className="text-center">
              <p className="text-xl font-semibold">
                Always login to view latest bookmarks
              </p>
              <button
                className="mt-4 px-4 py-2 rounded-full bg-orange-500 text-white  hover:bg-blue-600 focus:outline-none"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
