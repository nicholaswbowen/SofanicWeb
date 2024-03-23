import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const UploadSuccess = () => {
  return (
    <Grid container spacing={2} sx={{ margin: "20px" }}>
      <Grid item xs={12}>
      <Typography>Your highlight upload was successful.</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Remember to come back and upload again whenever you have new highlights.</Typography>
      </Grid>
  </Grid>
  )
}

export default UploadSuccess;