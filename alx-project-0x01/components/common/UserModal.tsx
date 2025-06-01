import React, { useState } from "react";
import { UserModalProps, UserData } from "@/interfaces";

const initialUser: UserData = {
  id: 0,
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useState<UserData>(initialUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.geo.")) {
      const key = name.split(".")[2];
      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          geo: {
            ...prev.address.geo,
            [key]: value,
          },
        },
      }));
    } else if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else if (name.startsWith("company.")) {
      const key = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          [key]: value,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-700">Add New User</h2>

        <div className="grid grid-cols-2 gap-4 ">
          <input name="name" onChange={handleChange} placeholder="Name" className="p-2 border rounded text-black" />
          <input name="username" onChange={handleChange} placeholder="Username" className="p-2 border rounded  text-black" />
          <input name="email" onChange={handleChange} placeholder="Email" className="p-2 border rounded  text-black" />
          <input name="phone" onChange={handleChange} placeholder="Phone" className="p-2 border rounded  text-black" />
          <input name="website" onChange={handleChange} placeholder="Website" className="p-2 border rounded  text-black" />
        </div>

        <h3 className="font-semibold mt-4 text-gray-700">Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <input name="address.street" onChange={handleChange} placeholder="Street" className="p-2 border rounded  text-black" />
          <input name="address.suite" onChange={handleChange} placeholder="Suite" className="p-2 border rounded  text-black" />
          <input name="address.city" onChange={handleChange} placeholder="City" className="p-2 border rounded  text-black" />
          <input name="address.zipcode" onChange={handleChange} placeholder="Zipcode" className="p-2 border rounded  text-black" />
          <input name="address.geo.lat" onChange={handleChange} placeholder="Latitude" className="p-2 border rounded  text-black" />
          <input name="address.geo.lng" onChange={handleChange} placeholder="Longitude" className="p-2 border rounded  text-black" />
        </div>

        <h3 className="font-semibold mt-4 text-gray-700">Company</h3>
        <div className="grid grid-cols-2 gap-4">
          <input name="company.name" onChange={handleChange} placeholder="Company Name" className="p-2 border rounded  text-black" />
          <input name="company.catchPhrase" onChange={handleChange} placeholder="Catch Phrase" className="p-2 border rounded  text-black" />
          <input name="company.bs" onChange={handleChange} placeholder="Business Slogan" className="p-2 border rounded  text-black" />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={onClose} className="cursor-pointer bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
