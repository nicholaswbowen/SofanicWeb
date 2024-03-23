import * as React from 'react';
import FileUploader from '../components/FileUploader'
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BooksList } from '../components/BooksList';
import useWindowDimensions from '../useWindowDimension';
import { processQuotes } from '../util/quoteParser';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from '../AuthProvider';

const Loady = () => {
  const { height } = useWindowDimensions();
  const fillNumber = Math.floor((height / 30 ) - 1 ) || 1;
  return (
    <>
    {Array(fillNumber).fill('').map((text,index) => {
      return (
        <Skeleton
          variant="rectangular"
          height={30}
          sx={{ width: '100%', marginTop: '2px' }}
          key={index}
        />
      )
    })}
    </>
  )
}

const BookUploader = () => {
  const [loadingBooks, setLoadingBooks] = React.useState(false);
  const [books, setBooks] = React.useState({});
  const [booksParsed, setBooksParsed] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const parseHighlights = async (rawHighlights) => {
    setLoadingBooks(true);
    const parsedQuotes = await processQuotes(rawHighlights, user.uid);
    
    const existingBooks = [];
    const booksQuery = query(collection(db, "books"), where("userId", "==", user.uid));
    const booksQuerySnapshot = await getDocs(booksQuery);
    booksQuerySnapshot.forEach((doc) => {
      existingBooks.push({id: doc.id, data: doc.data()});
    });
    console.log('parsedQuotes', parsedQuotes);
    console.log('existingBooks', existingBooks);
    
    await new Promise((resolve) => {
      existingBooks.forEach((existingBook) => {
        if (existingBook.data.shouldGenerateFlashCards){
          const existingBookIndex = parsedQuotes.findIndex(book => {
            console.log('book.id === existingBook.id', book.id === existingBook.id);
            console.log('book', book);
            console.log('existingBook', existingBook);
            return book.id === existingBook.id
          });
          if(existingBookIndex !== -1){
            setChecked((checked) => [...checked, existingBookIndex]);
          }
        }
      });
      resolve();
    })
    setBooks(parsedQuotes);
    setBooksParsed(true);
    setLoadingBooks(false);

  }

  return (
    <Grid container spacing={2} sx={{ margin: "20px" }}>

      <Grid item xs={12} md={6}>
      { books.length > 0 ?
        <>
        <Typography>Select which books you would like to have flashcards generated for.</Typography>
        <Typography>You may not want to create flash cards for every book. Only nonfiction titles are recommended.</Typography>
        </> :
        <>
        <Typography>In order to generate your flashcards, you need to upload the highlights file from your kindle.</Typography>
        <Typography>Plug in your device with a usb cable so that is shows up as an external drive and navigate to foo/my clippings.txt then drag it over.</Typography>
        </>
      }
      </Grid>
      <Grid item xs={12} md={6}>
          { booksParsed ?
            <BooksList
              books={books}
              checked={checked}
              setChecked={setChecked}
            /> :
            loadingBooks ? 
              <Loady /> :
              <FileUploader
                parseHighlights={parseHighlights}
              />
          }
      </Grid>
    </Grid>
  )
}

export default BookUploader;