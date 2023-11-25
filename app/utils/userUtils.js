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

const submitUser = async (method, url, userData) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return true;
    } else {
      console.error(`Failed to ${method.toLowerCase()} user`);
      return false;
    }
  } catch (error) {
    console.error(`Error ${method.toLowerCase()} user:`, error);
    return false;
  }
};

export { validateFirstName, validateLastName, validateEmail, submitUser };
