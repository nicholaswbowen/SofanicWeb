import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from "react-router-dom";
import useWindowDimensions from '../useWindowDimension';
import { uploadHighlights } from '../util/uploadHighlights';
import { db } from '../firebase';
import { AuthContext } from '../AuthProvider';

export function BooksList({books, checked, setChecked}) {
  const [submttingHighlights, setSubmittingHighlights] = React.useState(false);
  const [uploadSucceeded, setUploadSucceeded] = React.useState(false);
  const [uploadFailed, setUploadFailed] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  const { height } = useWindowDimensions();
  const submitBookSelections = () => {
    const selectedBooks = checked.map(checkIndex => books[checkIndex]);
    setSubmittingHighlights(true);
    console.log
    uploadHighlights(db, user, selectedBooks)
      .then(response => {
          setUploadSucceeded(true);
          return response;
      })
      .catch(error => {
          console.error('Error:', error);
          setUploadFailed(true);
      });
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (uploadFailed){
    return <Navigate to="/upload-failure"/>;
  }

  if (uploadSucceeded){
    return <Navigate to="/upload-success"/>;
  }

  return (
    <>
    <List dense sx={{ width: '100%', maxHeight: `${height - 200}px`, overflow: 'auto', bgcolor: 'background.paper' }}>
      {books.map((book, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            key={book.title}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={book.title} onClick={handleToggle(index)}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    <Box 
        display="flex"
        alignItems="right"
        justifyContent="right"
        marginTop="20px"
      >
    {
    submttingHighlights ?
      <CircularProgress /> :
      <Button onClick={submitBookSelections} variant="contained">Submit</Button>
    }
    </Box>
    </>
  );
}

const HighlightShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  alreadyIncludedInGeneration: PropTypes.bool.isRequired
});

const BookShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  highlights: PropTypes.arrayOf(HighlightShape).isRequired
});

BooksList.propTypes = {
  books: PropTypes.arrayOf(BookShape).isRequired,
  checked: PropTypes.array.isRequired,
  setChecked: PropTypes.func.isRequired
}