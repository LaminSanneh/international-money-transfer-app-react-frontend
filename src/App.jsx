import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container, Link, Typography } from "@material-ui/core";
import Home from "./components/Home";
import TransferForm from "./components/TransferForm";
import Profile from "./components/Profile";
import TransactionHistoryPage from "./components/TransactionHistoryPage";
import messagesEn from "./translations/en.json";
import messagesFr from "./translations/fr.json";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Beneficiaries from "./components/Beneficiaries";

const messages = {
  en: messagesEn,
  fr: messagesFr,
};

function App() {
  return (
    <Router>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Money Transfer Service
        </Typography>
        <Box
          sx={{
            typography: "body1",
            "& > :not(style) ~ :not(style)": {
              ml: 2,
            },
          }}
        >
          <Link href="/transfer">Create New Transfer</Link> | &nbsp;
          <Link href="/transactions">Past Transactions</Link> | &nbsp;
          <Link href="/beneficiaries">Beneficiaries</Link> | &nbsp;
          <Link href="/login">Login</Link> | &nbsp;
          <Link href="/register">Register</Link>
        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
          <Route path="/transfer" element={<TransferForm />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
