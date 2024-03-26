import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline, Link, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loginUser, loading } = useContext(AuthContext);
    const onLogin = (e) => {
        e.preventDefault();
        loginUser(email, password)
    };
    if (user){
        navigate('/')
    }
    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "20px" }}>
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Sofanic
                </Typography>
                <form onSubmit={onLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
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
                    {loading ? <CircularProgress /> : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    )}

                </form>
                <Typography component="p" variant="body2">
                    No account yet?{' '}
                    <Link component={NavLink} to="/signup" variant="body2">
                        Sign up
                    </Link>
                </Typography>
            </div>
        </Container>
    );
};

export default Login;