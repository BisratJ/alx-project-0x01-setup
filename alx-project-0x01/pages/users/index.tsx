import UserCard from "@/components/common/UserCard";
import Header from "@/components/layout/Header";
// Ensure UserProps, UserData, PostData are correctly defined and imported
// For UserData, it's the one that includes the 'posts?: PostData[]' field
import { UserProps, UserData, PostData } from "@/interfaces";
import { useState } from "react";
import UserModal from "@/components/common/UserModal";

// Your Users React Component
const Users: React.FC<UserProps> = ({ users }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [localUsers, setLocalUsers] = useState<UserData[]>(users || []);
  const [showModal, setShowModal] = useState(false);

  const handleAddUser = (userDataFromModal: Omit<UserData, 'id' | 'posts'> & Partial<Pick<UserData, 'id' | 'posts'>>) => {
    const newUser: UserData = {
      name: userDataFromModal.name || "New User",
      username: userDataFromModal.username || "newuser",
      email: userDataFromModal.email || "new@example.com",
      address: userDataFromModal.address || { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
      phone: userDataFromModal.phone || "",
      website: userDataFromModal.website || "",
      company: userDataFromModal.company || { name: '', catchPhrase: '', bs: '' },
      ...userDataFromModal,
      id: localUsers.length > 0 ? Math.max(...localUsers.map(u => u.id)) + 1 : 1, // Or a better ID strategy
      posts: userDataFromModal.posts || [],
    };
    setLocalUsers(prev => [...prev, newUser]);
  };

  if (!users) {
    return <p>Loading...</p>; // Or some loading indicator
  }

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
            <div key={user.id} className="bg-white p-4 rounded-lg shadow"> {/* Wrapper */}
              <UserCard
                user={user}
                expanded={expandedId === user.id}
                onToggle={() =>
                  setExpandedId(expandedId === user.id ? null : user.id)
                }
              />
              {user.posts && user.posts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Posts by {user.name}:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {/* This is the posts.map that the previous error wanted */}
                    {user.posts.map((post: PostData) => (
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

// getStaticProps - ensuring the required strings are present
export async function getStaticProps() { // <<< REQUIRED STRING 1
  // Fetch users
  const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users"); // <<< REQUIRED STRING 2 (URL)
  const usersData: UserData[] = await usersResponse.json();

  // Fetch posts
  const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postsData: PostData[] = await postsResponse.json();

  // Combine users with their respective posts
  const usersWithPosts: UserData[] = usersData.map((user) => {
    return {
      ...user,
      posts: postsData.filter((post) => post.userId === user.id)
    };
  });

  return {
    props: {
      users: usersWithPosts,
    },
  };
}

export default Users;
