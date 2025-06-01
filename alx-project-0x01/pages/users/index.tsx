import UserCard from "@/components/common/UserCard"
import Header from "@/components/layout/Header"
import { UserProps } from "@/interfaces";
import { useState } from "react"
import UserModal from "@/components/common/UserModal";
import { UserData } from "@/interfaces";


const Users: React.FC<UserProps> = ({ users }) => {

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [localUsers, setLocalUsers] = useState<UserData[]>(users || []);
  const [showModal, setShowModal] = useState(false);


  const handleAddUser = (user: UserData) => {
    user.id = localUsers.length + 1;
    setLocalUsers(prev => [...prev, user]);
  };

  
  if (!users) return null;
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
            <UserCard
              key={user.id}
              user={user}
              expanded={expandedId === user.id}
              onToggle={() =>
                setExpandedId(expandedId === user.id ? null : user.id)
              }
            />
          ))}
        </div>
      </main>
    </div>
  );

}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await response.json()

  return {
    props: {
      users
    }
  }
}

export default Users;