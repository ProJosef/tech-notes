import { fetchUsers } from '@/services/usersService';
import User from '@/components/User';

export default async function UsersList() {
  try {
    const users = await fetchUsers();

    const tableContent = users.map((user) => <User key={user._id} user={user} />);

    const content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Role
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );

    return content;
  } catch (error) {
    return <p className={'errmsg'}>{error.message}</p>;
  }
}
