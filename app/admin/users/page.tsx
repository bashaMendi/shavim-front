import { Table } from '@/components/ui';

async function getUsers() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/admin/users', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function AdminUsersPage() {
  let users = [];
  try {
    users = await getUsers();
  } catch {
    return <div className="text-red-600 font-bold text-center mt-8">שגיאה בטעינת המשתמשים</div>;
  }
  if (!users.length) return <div className="text-center mt-8 text-gray-500">לא נמצאו משתמשים</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ניהול משתמשים</h1>
      <Table>
        <Table.Head>
          <tr>
            <Table.HeaderCell>שם</Table.HeaderCell>
            <Table.HeaderCell>אימייל</Table.HeaderCell>
            <Table.HeaderCell>תפקיד</Table.HeaderCell>
          </tr>
        </Table.Head>
        <Table.Body>
          {users.map((u: any) => (
            <Table.Row key={u.id}>
              <Table.Cell>{u.name}</Table.Cell>
              <Table.Cell>{u.email}</Table.Cell>
              <Table.Cell>{u.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
