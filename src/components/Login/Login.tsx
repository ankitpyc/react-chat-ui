import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  useTheme,
  TextField,
  Divider,
  Alert,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import CircularIndeterminate from "../util/LoadingIcon";
import { LoginError, UserDetails } from "./LoginError";
import { UserSession } from "../../utils/sessionStore";
import { useAxios } from "../../utils/axiosInterceptor";
import {  fetchUserById } from "../../redux-store/onlineUsers";
import { useAppDispatch } from "../../redux-store/hooks";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const axiosInstance = useAxios();
  const sessionService = new UserSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserDetails>({
    userName: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<LoginError>({
    showAlert: false,
    message: "",
  });
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    setErrors({ email: email === "", password: password === "" });

    if (email && password) {
      axiosInstance
        .post("http://localhost:3023/LoginUser", { email, password })
        .then((response) => {
          debugger
          sessionService.SetSessionVariables(response.data);
          dispatch(fetchUserById(4))
          navigate("/chat");
        })
        .catch((error) => {
          if (error.code == "ERR_NETWORK") {
            console.error("ERR_NETWORK");
            throw error;
          }
          setAlert({ showAlert: true, message: error.response.data.error });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Grid
      sx={{
        background: theme.palette.background.paper,
        flexGrow: 1,
        height: "100vh",
      }}
      container
      spacing={2}
    >
      <Grid
        sx={{
          height: "100vh",
          backgroundImage:
            "url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwMTYtYy0wOF8xLWtzaDZtemEzLmpwZw.jpg)",
        }}
        xs={6}
      />
      <Grid xs={6}>
        <Stack 
          sx={{ height: "90vh" }}
          justifyContent="space-around"
          alignItems="center"
          m={4}
          spacing={1}
          p={4}
        >
          <Stack className="text-center" spacing={2}>
            <h1 className="text-2xl">Welcome to Chatsy 🦊 </h1>
            <small> Don't have an account ? Sign Up </small>
            <Divider />
          </Stack>
          {alert.showAlert && <Alert severity="error">{alert.message}</Alert>}
          <Stack p={12}>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                onChange={handleChange}
                required
                variant="outlined"
                color="secondary"
                type="email"
                sx={{ mb: 3 }}
                fullWidth
                value={formData.email}
                error={errors.email}
              />
              <TextField
                label="Password"
                name="password"
                onChange={handleChange}
                required
                variant="outlined"
                color="secondary"
                type="password"
                value={formData.password}
                error={errors.password}
                fullWidth
                sx={{ mb: 3 }}
              />
              {!loading ? (
                <Button
                  sx={{ width: "100%", borderRadius: "5px" }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Login
                </Button>
              ) : (
                <div style={{ display: "block", margin: "auto" }}>
                  <CircularIndeterminate />
                </div>
              )}
            </form>
          </Stack>
          <Divider />
          <Stack>Login With Google</Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
