// UsersTable.tsx
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  email: string;
}

interface PaginatedResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/users?skip=${page}&limit=${limit}`);
      const data: PaginatedResponse = await response.json();
      
      setUsers(data?.users);
      setPagination(prev => ({
        ...prev,
        page: data.page,
        totalPages: Math.ceil(data.total / limit)
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.page, pagination.limit);
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchUsers(newPage, pagination.limit);
  };

  const handlePageSizeChange = (newLimit: number) => {
    fetchUsers(1, newLimit);
  };

  return (
    <div className="users-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button 
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            
            <span>Page {pagination.page} of {pagination.totalPages}</span>
            
            <button 
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </button>

            <select 
              value={pagination.limit}
              onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
            >
              {[10, 25, 50, 100].map(limit => (
                <option key={limit} value={limit}>
                  Show {limit} per page
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;