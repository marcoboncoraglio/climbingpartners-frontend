import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAlert } from 'react-alert';

const axios = require('axios');

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.common.white,
        marginTop: theme.spacing(5),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LocalRegisterView() {
    const classes = useStyles();
    const alert = useAlert();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleChangeConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }

    function handleSubmitLoginForm(event) {
        event.preventDefault();
        if(password !== confirmPassword){
            return alert.error('Passwords do not match!');
        }
        axios.post('http://localhost:4000/api/auth/register', {
            username: username,
            password: password
        })
            .then((res) => {
                if(res.data.error){
                    return alert.error(res.data.error);
                }
                console.log(res.data.user);
            })
            .catch((err) => console.log(err));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmitLoginForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="Username"
                                name="Username"
                                variant="outlined"
                                required
                                fullWidth
                                label="Username"
                                value={username}                                
                                autoFocus
                                onChange={handleChangeUsername}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={handleChangePassword}
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPass"
                                label="Confirm password"
                                type="password"
                                value={confirmPassword}
                                onChange={handleChangeConfirmPassword}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}