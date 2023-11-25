import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';

import Link from 'next/link';

const getRoles = async () => {
  const res = await fetch('http://localhost:8000/roles', {
    next: { revalidate: 0 },
  });
  return res.json();
};

const Roles = async () => {
  const roles = await getRoles();

  //sorted by Role name by default.
  const sortedRoles = roles.sort((a, b) =>
    a.roleName.localeCompare(b.roleName)
  );

  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginTop='50px'
        marginBottom='50px'
      >
        <Link href='/roles/create'>
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: '20px' }}
          >
            Create Role
          </Button>
        </Link>
        <TableContainer
          component={Paper}
          style={{
            maxWidth: '600px',
            margin: '20px auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Role Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Short Description
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.shortDescription}</TableCell>
                  <TableCell>
                    <Link href={`/roles/${role.id}`}>
                      <Button
                        variant='outlined'
                        color='primary'
                        style={{ marginRight: '10px' }}
                      >
                        Update
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Roles;
