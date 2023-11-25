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

const checkDuplicateRole = async (roleName) => {
  try {
    const checkDuplicateRes = await fetch(`http://localhost:8000/roles`);
    const existingRoles = await checkDuplicateRes.json();
    return existingRoles.some((item) => item.roleName === roleName);
  } catch (error) {
    console.error('Error checking duplicate role:', error);
    return false;
  }
};

const submitRole = async (method, url, roleData) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });

    if (res.ok) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return true;
    } else {
      console.error(`Failed to ${method.toLowerCase()} role`);
      return false;
    }
  } catch (error) {
    console.error(`Error ${method.toLowerCase()} role:`, error);
    return false;
  }
};

export {
  validateRoleName,
  validateShortDescription,
  checkDuplicateRole,
  submitRole,
};
