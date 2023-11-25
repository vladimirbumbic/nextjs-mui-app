'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleForm from '@/app/components/RoleForm';

const getRoles = async () => {
  const res = await fetch('http://localhost:8000/roles', {
    next: { revalidate: 0 },
  });
  return res.json();
};

const RoleCreate = () => {
  const [role, setRole] = useState({ roleName: '', shortDescription: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [roleNameError, setRoleNameError] = useState('');
  const [shortDescriptionError, setShortDescriptionError] = useState('');

  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const validateRoleName = (name) => {
    const regex = /^[a-zA-Z0-9_]{2,16}$/;
    return regex.test(name);
  };

  const validateShortDescription = (description) => {
    if (description === '') {
      return true;
    }

    const regex = /^[a-zA-Z\s]+$/;
    const minLength = 2;
    const maxLength = 50;

    return (
      regex.test(description) &&
      description.length >= minLength &&
      description.length <= maxLength
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateRoleName(role.roleName)) {
      setRoleNameError(
        'Role Name must be between 2 and 16 characters and can contain underscore (_)'
      );
      return;
    }

    if (!validateShortDescription(role.shortDescription)) {
      setShortDescriptionError(
        'Short Description must be a string between 2 and 50 characters.'
      );
      return;
    }

    setIsLoading(true);

    setRoleNameError('');
    setShortDescriptionError('');
    setShowSuccessMessage(true);

    try {
      // Check for duplicate role name
      const existingRoles = await getRoles();
      if (
        existingRoles.some(
          (existingRole) => existingRole.roleName === role.roleName
        )
      ) {
        setRoleNameError(
          'Role Name already exists. Choose a different Role Name.'
        );
        setShowSuccessMessage(false);
        return;
      }

      // Simulate a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch('http://localhost:8000/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      });

      if (res.ok) {
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 1000);

        router.push('/roles');
        router.refresh();
      } else {
        console.error('Failed to create role');
      }
    } catch (error) {
      console.error('Error creating role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoleForm
      title='Create Role'
      onSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      role={role}
      isLoading={isLoading}
      showSuccessMessage={showSuccessMessage}
      roleNameError={roleNameError}
      shortDescriptionError={shortDescriptionError}
    />
  );
};

export default RoleCreate;
