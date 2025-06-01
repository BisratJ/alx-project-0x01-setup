import React from "react";
import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({ user, expanded, onToggle }) => {
  if (!user) return null;

  return (
    <div className="max-h-72 p-6 bg-white rounded-xl shadow-md flex flex-col justify-between">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4 space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold">
            {user.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-cyan-950">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-1">
          <p className="font-bold text-sm text-blue-700">{user.email}</p>
          <p className="text-sm text-gray-600">
            <strong>
              website:{" "}
              <span className="text-blue-300 hover:text-blue-700">
                {user.website}
              </span>
            </strong>
          </p>
      </div>

      {expanded && (
        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p>
            <strong>Company:</strong> {user.company.name}
          </p>
          <p>
            <strong>City:</strong> {user.address.city}
          </p>
          <p>
            <strong>Street:</strong> {user.address.street}
          </p>
          <p>
            <strong>Zip Code:</strong> {user.address.zipcode}
          </p>
        </div>
      )}

      <button
        onClick={onToggle}
        className="mt-4 text-blue-600 hover:text-blue-900 cursor-pointer font-semibold"
      >
        {expanded ? "": "show more"}
      </button>
    </div>
  );
};

export default UserCard;
