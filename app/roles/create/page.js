'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleForm from '@/app/components/RoleForm';
import {
  validateRoleName,
  validateShortDescription,
  submitRole,
} from '@/app/utils/roleUtils';

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
      setIsLoading(false);
      return;
    }

    const success = await submitRole(
      'POST',
      'http://localhost:8000/roles',
      role
    );

    if (success) {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1000);

      router.push('/roles');
      router.refresh();
    } else {
      console.error('Failed to create role');
    }

    setIsLoading(false);
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
