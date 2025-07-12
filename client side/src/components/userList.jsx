import { useEffect, useState } from "react";
import DataTable from "./dataTable";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/users/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const formattedUsers = res.data.map((user) => ({
          ...user,
          id: user._id, // Add this line to create a proper `id` field
        }));
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
        setLoading(false);
      });
  }, []);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:3000/users/admin/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = e.target;

    const updatedData = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value || selectedUser.password, // keep old if empty
      role: selectedUser.role,
      Fields: form.fields.value.split(",").map((f) => f.trim()),
      avatar: selectedUser.avatar || "",
    };

    try {
      await axios.put(
        `http://localhost:3000/users/admin/${selectedUser.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, ...updatedData } : u
        )
      );
      setShowModal(false);
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  console.log(selectedUser);
  return (
    <>
      <div className="flex flex-col justify-between h-full bg-white rounded-md shadow overflow-hidden">
        <DataTable
          columns={[
            { label: "ID", key: "_id" },
            { label: "Username", key: "username" },
            { label: "Email", key: "email" },
            { label: "role", key: "role" },
            { label: "Fields", key: "Fields" },
          ]}
          data={users}
          onDelete={(user) => {
            setSelectedUser(user);
            setShowDeleteConfirm(true);
          }}
          onEdit={(user) => {
            setSelectedUser(user);
            setShowModal(true);
          }}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-md w-[400px] shadow"
          >
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>

            <label className="block mb-2">
              Username:
              <input
                name="username"
                defaultValue={selectedUser.username}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <label className="block mb-2">
              Email:
              <input
                name="email"
                defaultValue={selectedUser.email}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <label className="block mb-2">
              Password:
              <input
                name="password"
                type="password"
                placeholder="Leave empty to keep current password"
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <label className="block mb-4">
              Fields (comma separated):
              <input
                name="fields"
                defaultValue={selectedUser.Fields?.join(", ")}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md shadow w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              This action will permanently delete the user{" "}
              <strong>{selectedUser?.fullName}</strong>.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
