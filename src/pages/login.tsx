import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import theme from "../utils/theme";

type LoginProps = {};
const LoginPage: React.FunctionComponent<LoginProps> = (_props) => {
  const router = useRouter();
  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const token = (document.querySelector("#token") as HTMLInputElement).value;

    try {
      await axios.post(`http://host.docker.internal:3001/api/login`, { token });
      router.push("/categories");
    } catch (e) {
      console.error(e);
      alert("Login deu zebra!!");
    }
  }
  return (
    <Box
      sx={{
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TextField
          id="token"
          margin="normal"
          required
          fullWidth
          label="Token da conta"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
