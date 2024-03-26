import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const About = () => {
  return (
    <Grid container spacing={2} sx={{ margin: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>About Sofanic</Typography>
      <Typography variant="body1" paragraph>
        At Sofanic, we are dedicated to harnessing the latest advancements in artificial intelligence to enhance your learning experience. Our team of experts in AI, education, and technology has developed a groundbreaking system that integrates cutting-edge techniques such as spaced repetition and natural language processing.
      </Typography>
      <Typography variant="body1" paragraph>
        With Sofanic, you benefit from:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" paragraph>
            <strong>Spaced repetition:</strong> Our system employs spaced repetition algorithms to optimize your learning schedule, ensuring that you review key concepts at the most effective intervals for maximum retention.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" paragraph>
            <strong>GPT-4 powered processing:</strong> Leveraging the power of GPT-4, our platform intelligently analyzes the highlights and annotations you make while reading, extracting key insights and generating personalized study materials tailored to your needs.
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" paragraph>
        Whether you are a student striving for academic success or a professional looking to stay ahead in your career, Sofanic is your ultimate learning companion. Experience the future of education with Sofanic today.
      </Typography>

    </Grid>
  );
}

export default About;