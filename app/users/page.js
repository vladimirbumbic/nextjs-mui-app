'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from '@mui/material';
import Link from 'next/link';

const getUsers = async () => {
  const res = await fetch('http://localhost:8000/users', {
    next: { revalidate: 0 },
  });
  return res.json();
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedUsers = users.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const startIndex = page * rowsPerPage;
  const usersOnPage = sortedUsers.slice(startIndex, startIndex + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginTop='50px'
        marginBottom='50px'
      >
        <Link href='/users/create'>
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: '20px' }}
          >
            Create User
          </Button>
        </Link>
        {loading ? (
          <p>Loading Users...</p>
        ) : (
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
                  <TableCell style={{ fontWeight: 'bold' }}>
                    First Name
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    Last Name
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    Role Name
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersOnPage.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.roleName}</TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>
                        <Button variant='outlined' color='primary'>
                          Update
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={sortedUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default Users;
