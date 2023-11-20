import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

const newChatButtonStyles = {
  m: 1,
  color: 'white',
  borderColor: 'gray',
  width: '80%',
  height: '100%',
  transition: 'width 0.5s ease-in-out',
};

function NewChatButton({ isShow }) {
  return (
    <div>
      {isShow ? null : (
        <Button variant="outlined" startIcon={<Add />} style={newChatButtonStyles}>
          New Chat
        </Button>
      )}
    </div>
  );
}

export default NewChatButton;
