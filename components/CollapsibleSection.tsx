import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: ReactNode;
  children: ReactNode;
  initialOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  // Generate a more stable ID if title is a simple string, otherwise fallback
  const titleString = typeof title === 'string' ? title : (Array.isArray(title) ? title.join('') : '');
  const contentId = `collapsible-content-${titleString.replace(/\W+/g, '-').toLowerCase() || Math.random().toString(36).substring(2, 9)}`;


  return (
    <div className="border border-gray-200 rounded-lg mb-4 bg-white shadow-sm">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors rounded-t-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="flex-1">{title}</span>
        {isOpen ? <ChevronUp size={20} className="text-gray-600 ml-2 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-600 ml-2 flex-shrink-0" />}
      </button>
      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`} // Increased max-h for potentially long content
      >
        {/* Conditional rendering can be fine, or always render and use CSS. 
            For animations, often better to keep in DOM and use opacity/max-height.
            The current structure conditionally renders the *inner* div with padding.
        */}
        {isOpen && (
          <div className="p-4 pt-2 text-gray-600 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleSection;