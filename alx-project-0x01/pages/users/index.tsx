// In pages/users/index.tsx

import UserCard from "@/components/common/UserCard";
import Header from "@/components/layout/Header";
import { UserProps, UserData, PostData } from "@/interfaces"; // Ensure PostData is imported if used explicitly
import { useState } from "react";
import UserModal from "@/components/common/UserModal";

const Users: React.FC<UserProps> = ({ users }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [localUsers, setLocalUsers] = useState<UserData[]>(users || []);
  const [showModal, setShowModal] = useState(false);

  const handleAddUser = (user: Omit<UserData, 'id' | 'posts'> & Partial<Pick<UserData, 'id' | 'posts'>>) => {
    // For newly added users, initialize with an empty posts array
    const newUser: UserData = {
        ...user, // Spread the incoming user data from the modal
        id: localUsers.length > 0 ? Math.max(...localUsers.map(u => u.id)) + 1 : 1, // A more robust way to generate ID
        posts: user.posts || [], // Ensure posts array exists, defaults to empty
        // Provide default empty structures for complex fields if not supplied by modal
        address: user.address || { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
        company: user.company || { name: '', catchPhrase: '', bs: '' },
    };
    setLocalUsers(prev => [...prev, newUser]);
  };

  if (!users) return null; // Or some loading state

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <main className="p-6 min-h-screen bg-gradient-to-b to-sky-800">
        <div className="flex justify-end mb-4 px-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 font-bold cursor-pointer text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>

        {showModal && (
          <UserModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddUser}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 items-start">
          {localUsers.map(user => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow"> {/* Wrapper for card + posts */}
              <UserCard
                user={user}
                expanded={expandedId === user.id}
                onToggle={() =>
                  setExpandedId(expandedId === user.id ? null : user.id)
                }
              />
              {/* ✨ This is where we add posts.map */}
              {user.posts && user.posts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Posts by {user.name}:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {user.posts.map((post: PostData) => ( // Ensure post is typed with PostData
                      <li key={post.id} className="text-sm text-gray-600">
                        {post.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Users;

// getStaticProps (as modified above) should be here
