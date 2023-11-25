'use client';
import { Typography, Container, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const navLinks = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Roles',
      href: '/roles',
    },
    {
      name: 'Users',
      href: '/users',
    },
  ];

  const pathname = usePathname();

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            Next.js MUI
          </Typography>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  marginRight: 15,
                  textDecoration: 'none',
                }}
                className={isActive ? 'active' : 'non-active'}
              >
                {link.name}
              </Link>
            );
          })}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
