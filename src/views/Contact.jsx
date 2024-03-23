import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Typography';

const Contact = () => {
  return (
    <Grid container spacing={2} sx={{ margin: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        Have questions, feedback, or just want to say hello? Wed love to hear from you! Click the button below to email the creators directly, and one of our team members will respond as soon as possible.
      </Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="mailto:your@email.com"
            disabled={true}
          >
            Email Us
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Contact;