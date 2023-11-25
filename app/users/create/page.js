'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UsersForm from '@/app/components/UsersForm';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  submitUser,
} from '@/app/utils/userUtils';

const CreateUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roleName: '',
    createdAt: new Date().toISOString(),
  });
  const [roles, setRoles] = useState([]);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:8000/roles');
        const data = await res.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
      const success = await submitUser(
        'POST',
        'http://localhost:8000/users',
        user
      );

      if (success) {
        router.push('/users');
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
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
      mode='create'
    />
  );
};

export default CreateUser;
