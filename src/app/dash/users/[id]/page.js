import EditUserForm from '@/components/EditUserForm';
import { fetchUserById } from '@/services/usersService';

export default async function EditUser({ params }) {
  const { id } = params;
  try {
    const user = await fetchUserById(id);
    return <EditUserForm user={user} />;
  } catch (error) {
    return <p className={'errmsg'}>{error.message}</p>;
  }
}
