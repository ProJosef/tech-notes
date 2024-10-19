export const fetchUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const fetchUserById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const createUser = async (userData) => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data?.error);
  }

  return true;
};
