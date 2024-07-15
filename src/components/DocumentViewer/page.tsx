import React from 'react';

interface DocumentProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;  
}

const Document: React.FC<DocumentProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3 xl:w-3/5">
        <div className="p-4">
          <button onClick={onClose} className="text-black float-right">Close</button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Document;