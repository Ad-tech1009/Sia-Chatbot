import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const ChatWindow = ({ msg, handleFeedback }) => (
    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[90%] md:max-w-[70%] px-4 py-3 rounded-xl break-words whitespace-pre-wrap
        ${msg.role === 'user' ? 'bg-indigo-700 text-white rounded-br-none' : 'bg-gray-800 text-gray-100 rounded-bl-none'}`}
      >
        {msg.content}
        {msg.role === 'sia' && (
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={() => handleFeedback(msg.id, true)}
              className={`p-1 ${msg.feedback === true ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
            >
              <FiThumbsUp size={16} />
            </button>
            <button
              onClick={() => handleFeedback(msg.id, false)}
              className={`p-1 ${msg.feedback === false ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
            >
              <FiThumbsDown size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

export default ChatWindow;