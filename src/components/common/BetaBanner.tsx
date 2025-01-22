import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { WaitlistForm } from '../waitlist/WaitlistForm';

export function BetaBanner() {
  const [showModal, setShowModal] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  if (!bannerVisible) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-primary z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <Star size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Early access available!</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-primary px-4 py-1.5 rounded-full text-sm font-medium
                       hover:bg-opacity-90 transition-colors"
            >
              Join Beta
            </button>
            <button
              onClick={() => setBannerVisible(false)}
              className="text-white/80 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div 
            className="bg-white rounded-xl w-full max-w-2xl overflow-hidden transform transition-all"
            style={{ animation: 'modal-pop 0.3s ease-out' }}
          >
            <div className="relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X size={24} />
              </button>
              <WaitlistForm onSuccess={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}