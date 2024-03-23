import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const UploadFailure = () => {
  return (
    <Grid container spacing={2} sx={{ margin: "20px" }}>
      <Grid item xs={12}>
        <Typography>Your highlight upload was unsuccessful.</Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to="/uploader"><Typography>Click here to try again</Typography></Link>
      </Grid>

    </Grid>
  )
}

export default UploadFailure;