import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const CircularIndeterminate = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

const UsersForm = ({
  handleSubmit,
  handleInputChange,
  user,
  roles,
  loading,
  firstNameError,
  lastNameError,
  emailError,
  mode,
}) => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '20px',
            padding: '20px',
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            label='First Name'
            name='firstName'
            value={user.firstName}
            onChange={handleInputChange}
            error={!!firstNameError}
            helperText={firstNameError}
            fullWidth
            margin='dense'
            required
          />
          <TextField
            label='Last Name'
            name='lastName'
            value={user.lastName}
            onChange={handleInputChange}
            error={!!lastNameError}
            helperText={lastNameError}
            fullWidth
            margin='dense'
            required
          />

          <TextField
            label='Email Address'
            name='email'
            value={user.email}
            onChange={handleInputChange}
            error={!!emailError}
            helperText={emailError}
            fullWidth
            margin='dense'
            required
          />
          <FormControl fullWidth margin='normal' required>
            <InputLabel id='roleNameLabel'>Role Name</InputLabel>
            <Select
              labelId='roleNameLabel'
              name='roleName'
              value={user.roleName}
              onChange={handleInputChange}
            >
              {roles
                .sort((a, b) => a.roleName.localeCompare(b.roleName))
                .map((role) => (
                  <MenuItem key={role.id} value={role.roleName}>
                    {role.roleName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: '20px' }}
          >
            {mode === 'create' ? 'Create User' : 'Update User'}
          </Button>
        </form>
      )}
    </Container>
  );
};

export default UsersForm;
