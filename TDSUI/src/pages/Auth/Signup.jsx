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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Alert,
  InputAdornment,
  IconButton,
  Card,
} from "@mui/material";
import { Eye, EyeOff, Blocks, ArrowRight } from "lucide-react";
import { login } from "../../store/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("member");
  const [orgCode, setOrgCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must include lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must include uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must include number";
    return "";
  };

  const validateConfirmPassword = (confirmPass) => {
    if (!confirmPass) return "Please confirm your password";
    if (confirmPass !== password) return "Passwords do not match";
    return "";
  };

  const validateOrgCode = (code) => {
    if (role === "member" && !code)
      return "Organization code is required for members";
    return "";
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    const validations = {
      email: () => validateEmail(email),
      password: () => validatePassword(password),
      confirmPassword: () => validateConfirmPassword(confirmPassword),
      orgCode: () => validateOrgCode(orgCode),
    };

    if (field in validations) {
      setFormErrors({ ...formErrors, [field]: validations[field]() });
    }
  };

  const validateForm = () => {
    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
      orgCode: validateOrgCode(orgCode),
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      setTouched({
        email: true,
        password: true,
        confirmPassword: true,
        orgCode: role === "member",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(login({ email, role }));
      navigate("/dashboard");
    } catch (err) {
      setError(
        "An error occurred during signup. Please check your inputs and try again."
      );
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
              Create Account
            </Typography>
            <Typography color="text.secondary">
              Join TDS API Management Platform
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
              name="email"
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
              name="password"
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

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={touched.confirmPassword && !!formErrors.confirmPassword}
              helperText={touched.confirmPassword && formErrors.confirmPassword}
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
                      aria-label="toggle confirm password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl sx={{ mt: 2 }}>
              <FormLabel sx={{ mb: 1, fontWeight: 500 }}>
                Account Type
              </FormLabel>
              <RadioGroup
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (e.target.value === "admin") {
                    setOrgCode("");
                    setFormErrors({ ...formErrors, orgCode: "" });
                  }
                }}
                name={role}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <FormControlLabel
                  value="admin"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#2563eb",
                        },
                      }}
                    />
                  }
                  label="Admin"
                  disabled={isLoading}
                />
                <FormControlLabel
                  value="member"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#2563eb",
                        },
                      }}
                    />
                  }
                  label="Organization Member"
                  disabled={isLoading}
                />
              </RadioGroup>
            </FormControl>

            {role === "member" && (
              <TextField
                fullWidth
                label="Organization Code"
                value={orgCode}
                name="orgCode"
                onChange={(e) => setOrgCode(e.target.value)}
                onBlur={() => handleBlur("orgCode")}
                error={touched.orgCode && !!formErrors.orgCode}
                helperText={touched.orgCode && formErrors.orgCode}
                margin="normal"
                required
                disabled={isLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            )}

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
              Create Account
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link
                href="/login"
                underline="hover"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  "&:hover": { color: "primary.dark" },
                }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Signup;
