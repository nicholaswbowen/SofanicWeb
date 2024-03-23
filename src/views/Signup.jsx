import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline, Link, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthProvider';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, createUser, loading } = useContext(AuthContext);
    const onSubmit = async (e) => {
        e.preventDefault();
        createUser(email,password)
        .then((result) => {
            // Update user profile with display name
            navigate("/");
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
    };
    if (user) {
        navigate("/");
      }
    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "20px" }}>
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    StudyAssist
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {loading ? <CircularProgress/> : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    )}

                </form>
                <Typography component="p" variant="body2">
                    Already have an account?{' '}
                    <Link component={NavLink} to="/login" variant="body2">
                        Sign in
                    </Link>
                </Typography>
            </div>
        </Container>
    );
};

export default Signup;