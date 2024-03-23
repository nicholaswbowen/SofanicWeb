import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


 
const Home = () => {
  return (
    <Grid container spacing={2} sx={{ margin: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>StudyAssist is revolutionizing the way you learn by leveraging the power of artificial intelligence and spaced repitition.</Typography>
        <Typography sx={{marginBottom: "20px"}}> Say goodbye to hours of tedious studying and hello to efficient, effective learning tailored just for you. Our AI-powered system takes the hard work out of studying, allowing you to focus on mastering your field without the stress.</Typography>
        <Typography>
          Test your understanding effortlessly: Our system analyzes the books and papers you read, then quizzes you to gauge your comprehension.
          Fill knowledge gaps seamlessly: Based on your quiz results, StudyAssist provides personalized resources to help you strengthen your understanding and skills.
          Focus on what matters: By streamlining the studying process, StudyAssist frees up your time and energy so you can concentrate on excelling in your chosen field.
          </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Start your journey toward effortless learning today!</Typography>
      </Grid>

    </Grid>
  );
}

export default Home;