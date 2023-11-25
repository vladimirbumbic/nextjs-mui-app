import { Container, TextField, Button } from '@mui/material';

const RoleForm = ({
  title,
  onSubmit,
  handleInputChange,
  role,
  isLoading,
  showSuccessMessage,
  roleNameError,
  shortDescriptionError,
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
      <form
        onSubmit={onSubmit}
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
          label='Role Name'
          name='roleName'
          value={role.roleName}
          onChange={handleInputChange}
          error={!!roleNameError}
          helperText={roleNameError}
          fullWidth
          margin='dense'
          required
        />
        <TextField
          label='Short Description'
          name='shortDescription'
          value={role.shortDescription}
          onChange={handleInputChange}
          error={!!shortDescriptionError}
          helperText={shortDescriptionError}
          fullWidth
          margin='dense'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={isLoading}
          style={{ marginTop: '20px' }}
        >
          {isLoading ? <span>Processing...</span> : <span>{title}</span>}
        </Button>
        {showSuccessMessage && (
          <p style={{ marginTop: '10px', color: 'green' }}>
            {title} successfully!
          </p>
        )}
      </form>
    </Container>
  );
};

export default RoleForm;
