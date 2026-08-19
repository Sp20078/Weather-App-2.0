import { FiAlertCircle, FiX } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-xl p-4 flex items-center gap-3 max-w-md mx-auto">
      <FiAlertCircle className="text-red-300 text-xl flex-shrink-0" />
      <p className="text-red-200 text-sm flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="text-red-300 hover:text-red-200 transition-colors"
      >
        <FiX className="text-lg" />
      </button>
    </div>
  );
}
