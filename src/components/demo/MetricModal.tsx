import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface MetricModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  color: string;
  textColor?: string;
}

export function MetricModal({ 
  title, 
  isOpen, 
  onClose, 
  children, 
  color,
  textColor = 'text-white'
}: MetricModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className={`${color} p-4 rounded-t-xl flex justify-between items-center`}>
          <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`${textColor} hover:bg-black/10 rounded-full p-1 transition-colors`}
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}