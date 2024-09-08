import React from 'react';
import Image from 'next/image';
import { User } from '@/types';

interface PeopleYouMayKnowProps {
  users: User[];
  onFollow: (user: User) => void;
}

const PeopleYouMayKnow: React.FC<PeopleYouMayKnowProps> = ({ users, onFollow }) => {
  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">People you may know</h3>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={user.avatar}
                alt={user.username}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <div>
                <p className="font-bold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.followers.length} followers</p>
              </div>
            </div>
            <button
              onClick={() => onFollow(user)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;