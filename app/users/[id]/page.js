'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UsersForm from '@/app/components/UsersForm';

const UpdateUser = ({ params }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleName: '',
    createdAt: '',
  });
  const [roles, setRoles] = useState([]);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/users/${params.id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:8000/roles/');
        const data = await res.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUser();
    fetchRoles();
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateFirstName = (firstName) => {
    const regex = /^[a-zA-Z\s]{2,20}$/;
    return regex.test(firstName);
  };

  const validateLastName = (lastName) => {
    const regex = /^[a-zA-Z\s]{2,20}$/;
    return regex.test(lastName);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFirstName(user.firstName)) {
      setFirstNameError(
        'First Name must be between 2 and 16 characters and only alphabetic characters allowed'
      );
      return;
    }

    if (!validateLastName(user.lastName)) {
      setLastNameError(
        'Last Name must be between 2 and 16 characters and only alphabetic characters allowed'
      );
      return;
    }

    if (!validateEmail(user.email)) {
      setEmailError('Invalid email address');
      return;
    }

    setLoading(true);

    setFirstNameError('');
    setLastNameError('');
    setEmailError('');

    try {
      setTimeout(async () => {
        const res = await fetch(`http://localhost:8000/users/${params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (res.ok) {
          router.push('/users');
        } else {
          console.error('Failed to update user');
        }
      }, 2000);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersForm
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      user={user}
      roles={roles}
      loading={loading}
      firstNameError={firstNameError}
      lastNameError={lastNameError}
      emailError={emailError}
      mode='update'
    />
  );
};

export default UpdateUser;
