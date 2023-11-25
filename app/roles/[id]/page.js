'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleForm from '@/app/components/RoleForm';

const RoleUpdate = ({ params }) => {
  const [role, setRole] = useState({ roleName: '', shortDescription: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [roleNameError, setRoleNameError] = useState('');
  const [shortDescriptionError, setShortDescriptionError] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

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
        const checkDuplicateRes = await fetch(`http://localhost:8000/roles`);
        const existingRoles = await checkDuplicateRes.json();

        setIsDuplicate(existingRoles.some((item) => item.roleName === value));
      } catch (error) {
        console.error('Error checking duplicate role:', error);
      }
    }
    setRoleNameError('');
    setShortDescriptionError('');
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

    if (isDuplicate) {
      setRoleNameError('Role with the same name already exists.');

      return;
    }

    setIsLoading(true);

    setRoleNameError('');
    setShortDescriptionError('');
    setShowSuccessMessage(true);

    try {
      // Simulate a delay of 2 seconds

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch(`http://localhost:8000/roles/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      });

      if (res.ok) {
        // Hide success message after one second
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 1000);

        router.push('/roles');
        router.refresh();
      } else {
        console.error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsLoading(false);
    }
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
