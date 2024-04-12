import { useEffect } from 'react';

const PipeyResponse = ({ response, onClose, showAIResponse }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onClose();
  //   }, 10000); // Set the timeout for 10 seconds

  //   return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  // }, [onClose]); // Only re-run the effect if onClose changes

  return (
    // The container is fixed at the bottom right of the screen
    <div className={`fixed bottom-0 right-0 p-4 max-w-xl w-full transform transition-all duration-5000 ${showAIResponse ? "translate-x-0" : "translate-x-full"}`}>
      {/* The flex container for image and chat bubble */}
      <div className="flex items-end space-x-2">
        
        {/* The chat bubble with text */}
        <div className="relative bg-white rounded-lg px-4 py-2 shadow-lg">
          <p className="text-gray-700 text-sm">{response}</p>
          
          {/* The tail for the chat bubble */}
          <div className="absolute bottom-0 left-0 -mb-2 ml-1 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white transform rotate-45"></div>
        </div>
        
        {/* The chatbot image */}
        <img 
          src="mascot.png" // Update with the correct path
          alt="Chatbot" 
          className="w-100 h-100" // Adjust size as needed
        />
      </div>
    </div>
  );
};

export default PipeyResponse;