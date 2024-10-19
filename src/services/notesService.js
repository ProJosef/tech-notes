export const fetchNotes = async () => {
  const response = await fetch('http://localhost:3000/api/notes', { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const fetchNoteById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const createNote = async (noteData) => {
  const response = await fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    body: JSON.stringify(noteData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const updateNote = async (id, updatedData) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};

export const deleteNote = async (id) => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error);
  }
  return data;
};
