import "./App.css";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import ExplorePage from "./Pages/ExplorePage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();
  return (
    <div className="App">
      <body className="App-body">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <img src="/logo512.png" className="App-logo" alt="logo" />
                <h1>Welcome to ChefTalk</h1>
                <HomePage />
              </>
            }
          />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </body>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            switch (newValue) {
              case 0:
                navigate("/explore");
                break;
              case 1:
                navigate("/");
                break;
              case 2:
                navigate("/profile");
                break;
              default:
                break;
            }
          }}
        >
          <BottomNavigationAction label="Explore" icon={<PublicIcon />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default App;
