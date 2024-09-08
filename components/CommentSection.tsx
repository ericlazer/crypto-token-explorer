import React, { useState } from 'react';

const CommentSection: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission logic here
    console.log('Submitted comment:', comment);
    setComment('');
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="space-y-4">
        {/* Sample comments */}
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold">User123</p>
          <p>Great project! Looking forward to seeing more developments.</p>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold">CryptoFan</p>
          <p>Interesting concept, but I have some concerns about scalability.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Add a comment..."
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;