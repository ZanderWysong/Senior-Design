import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Card,
  Divider,
} from "@mui/material";
import { Eye, EyeOff, Blocks, ArrowRight } from "lucide-react";
import { login } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    if (field === "email") {
      setFormErrors({ ...formErrors, email: validateEmail(email) });
    } else if (field === "password") {
      setFormErrors({ ...formErrors, password: validatePassword(password) });
    }
  };

  const validateForm = () => {
    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);

    try {
      // Temporary authentication logic
      const validCredentials = {
        admin: {
          email: "admin@tds.com",
          password: "admin123",
          role: "admin",
        },
        member: {
          email: "member@tds.com",
          password: "member123",
          role: "member",
        },
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        email.includes("admin") &&
        password === validCredentials.admin.password
      ) {
        dispatch(login({ email, password, role: "admin" }));
        navigate("/dashboard");
      } else if (
        email === validCredentials.member.email &&
        password === validCredentials.member.password
      ) {
        dispatch(login({ email, password, role: "member" }));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          zIndex: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          py: 4,
          position: "relative",
        }}
      >
        <Card
          sx={{
            width: "100%",
            p: 4,
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.5)",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                mb: 4,
              }}
            >
              <Blocks size={40} className="text-blue-600" />
              <Typography
                variant="h4"
                component="span"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TDS API
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography color="text.secondary">
              Sign in to continue to your dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              error={touched.email && !!formErrors.email}
              helperText={touched.email && formErrors.email}
              margin="normal"
              required
              disabled={isLoading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={touched.password && !!formErrors.password}
              helperText={touched.password && formErrors.password}
              margin="normal"
              required
              disabled={isLoading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              endIcon={<ArrowRight size={20} />}
              sx={{
                mt: 3,
                mb: 2,
                height: 48,
                borderRadius: "12px",
                background: "linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)",
                },
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link
                href="/signup"
                underline="hover"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  "&:hover": { color: "primary.dark" },
                }}
              >
                Don't have an account? Sign up
              </Link>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Temporary Credentials Info */}
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.1) 100%)",
              }}
            >
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                Temporary Test Credentials
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" component="div" gutterBottom>
                  <strong>Admin Account:</strong>
                  <br />
                  Email: admin@tds.com
                  <br />
                  Password: admin123
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" component="div">
                  <strong>Member Account:</strong>
                  <br />
                  Email: member@tds.com
                  <br />
                  Password: member123
                </Typography>
              </Box>
            </Box>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
