import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import WelcomeModal from "./Components/WelcomeModal";
import FirstLoginModal from "./Components/FirstLoginModal";
import Navbar from "./Components/Navbar";
import RecipePage from "./Components/Recipe/RecipePage";
import BACKEND_URL from "./constants";

function App() {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const theme = createTheme({
    components: {
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            paddingBottom: "env(safe-area-inset-bottom)",
            backgroundColor: "var(--primary-color)",
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: "var(--neutral-dark)",
            "&.Mui-selected": {
              color: "var(--secondary-color)", // Or any color you want for selected icons
            },
          },
        },
      },
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [counter, setCounter] = useState(0);

  // useEffect that shows the logo at the start of the app
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(false);
    }, 1500); // Change this value to control the duration the modal is displayed

    return () => clearTimeout(timer); // Cleanup the timer to prevent memory leaks
  }, []);

  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    const fetchedRecipeList = await axios.get(`${BACKEND_URL}/recipes`);
    setRecipeList(fetchedRecipeList.data);
  };

  // auth0
  const { loginWithRedirect, isAuthenticated, user, isLoading, logout } =
    useAuth0();
  const [userAuth0Info, setUserAuth0Info] = useState(null);

  // useEffect(() => {
  //   isAuthenticated && getUserAuth0Info();
  //   return;
  // }, [isAuthenticated]);

  const getUserAuth0Info = async () => {
    let data = [];
    data = await axios.get(
      `http://localhost:3001/users/management/${user.email}`
    );
    setUserAuth0Info(data.data[0]);
  };

  // login
  const LoginButton = (
    <Button
      variant="outlined"
      onClick={() => loginWithRedirect()}
      startIcon={<LoginRoundedIcon />}
      size="large"
    >
      {isLoading ? "Loading ..." : "Log In/ Sign Up"}
    </Button>
  );

  const LogoutButton = (
    <Button
      variant="contained"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Logout!
    </Button>
  );

  // to help set the height of the app to the height of the viewport
  useEffect(() => {
    // Define the function
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set the initial value
    setVH();

    // Add the event listener
    window.addEventListener("resize", setVH);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", setVH);
    };
  }, []);

  return (
    <div className="App">
      <WelcomeModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* add condition to show only on first login */}
      {/* {user && userAuth0Info?.logins_count === 1 && <FirstLoginModal />} */}

      {/* top nav bar */}
      <Navbar setValue={setValue} />

      {/* everything else */}
      <body className="App-body">
        {/* logins_count: {userAuth0Info?.logins_count} */}
        {/* User email: {user?.email} */}
        <Routes>
          <Route path="/" element={<HomePage recipeList={recipeList} />} />
          <Route
            path="/explore"
            element={<ExplorePage recipeList={recipeList} />}
          />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
          <Route
            path="/profile"
            element={
              <ProfilePage
                isAuthenticated={isAuthenticated}
                LoginButton={LoginButton}
                LogoutButton={LogoutButton}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </body>

      {/* bottom navigation bar */}
      {/* {user && ( */}
      <Box>
        <ThemeProvider theme={theme}>
          <BottomNavigation
            className="bottom-navigation"
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
        </ThemeProvider>
      </Box>
      {/* )} */}
    </div>
  );
}

export default App;
