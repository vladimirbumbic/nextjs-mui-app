'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleForm from '@/app/components/RoleForm';
import {
  validateRoleName,
  validateShortDescription,
  checkDuplicateRole,
  submitRole,
} from '@/app/utils/roleUtils';

const RoleUpdate = ({ params }) => {
  const [role, setRole] = useState({ roleName: '', shortDescription: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [roleNameError, setRoleNameError] = useState('');
  const [shortDescriptionError, setShortDescriptionError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch(`http://localhost:8000/roles/${params.id}`);
        const data = await res.json();
        setRole(data);
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };

    if (params.id) {
      fetchRole();
    }
  }, [params.id]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });

    //Check for duplicate role name
    if (name === 'roleName') {
      try {
        const isDuplicate = await checkDuplicateRole(value); // Use the updated value
        if (isDuplicate) {
          setRoleNameError('Role with the same name already exists.');
        } else {
          setRoleNameError('');
        }
      } catch (error) {
        console.error('Error checking duplicate role:', error);
      }
    } else {
      setRoleNameError('');
    }

    setShortDescriptionError('');
  };

  const handleUpdate = async (e) => {
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

    if (roleNameError) {
      return;
    }

    setIsLoading(true);

    setRoleNameError('');
    setShortDescriptionError('');
    setShowSuccessMessage(true);

    const success = await submitRole(
      'PATCH',
      `http://localhost:8000/roles/${params.id}`,
      role
    );

    if (success) {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1000);

      router.push('/roles');
      router.refresh();
    } else {
      console.error('Failed to update role');
    }

    setIsLoading(false);
  };

  return (
    <RoleForm
      title='Update Role'
      onSubmit={handleUpdate}
      handleInputChange={handleInputChange}
      role={role}
      isLoading={isLoading}
      showSuccessMessage={showSuccessMessage}
      roleNameError={roleNameError}
      shortDescriptionError={shortDescriptionError}
    />
  );
};

export default RoleUpdate;
