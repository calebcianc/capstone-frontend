// Libraries and Frameworks
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

// Internal Modules, Components, and Constants
import BACKEND_URL from "./constants";
import { GlobalUseContext } from "./GlobalUseContext";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import ExplorePage from "./Pages/ExplorePage";
import ProfilePage from "./Pages/ProfilePage";
import WelcomeModal from "./Components/WelcomeModal";
import FirstLoginModal from "./Components/FirstLoginModal";
import Navbar from "./Components/Navbar";
import RecipePage from "./Components/Recipe/RecipePage";

// Styles
import "./App.css";

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
  const { isAuthenticated, user } = useAuth0();
  const [userProfile, setUserProfile] = useState([]);

  // useEffect that shows the logo at the start of the app
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(false);
    }, 1500); // Change this value to control the duration the modal is displayed

    return () => clearTimeout(timer); // Cleanup the timer to prevent memory leaks
  }, []);

  // fetch recipe list on every change in counter and store in state recipeList
  useEffect(() => {
    fetchRecipe();
  }, [counter, isAuthenticated, userProfile]);
  const [recipeList, setRecipeList] = useState([]);
  const fetchRecipe = async () => {
    const fetchedRecipeList = await axios.get(`${BACKEND_URL}/recipes`);
    setRecipeList(fetchedRecipeList.data);
  };

  // auth0
  const [isFirstLogin, setIsFirstLogin] = useState(null);
  // get user profile
  const getUserProfile = async () => {
    let data;
    data = await axios.get(`${BACKEND_URL}/users/profile/${user.email}`);
    setUserProfile(data.data);
  };
  useEffect(() => {
    if (user) {
      getUserProfile();
    }
  }, [user]);

  // check if it is first time user login
  useEffect(() => {
    isAuthenticated && checkUserInDatabase();
    return;
  }, [isAuthenticated]);
  const checkUserInDatabase = async () => {
    let data;
    data = await axios.get(`${BACKEND_URL}/users/first-login/${user.email}`);
    setIsFirstLogin(data.data);
  };

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
    <GlobalUseContext.Provider
      value={{ userProfile, setUserProfile, isAuthenticated }}
    >
      <div className="App">
        {/* welcome modal that renders on every refresh of app  */}
        <WelcomeModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        {/* add condition to show only on first login */}
        {user && isFirstLogin && <FirstLoginModal />}
        {/* top nav bar */}
        <Navbar setValue={setValue} />
        {/* everything else */}
        <div className="App-body">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  recipeList={recipeList}
                  counter={counter}
                  setCounter={setCounter}
                />
                // isAuthenticated ? (
                //   <HomePage
                //     recipeList={recipeList}
                //     counter={counter}
                //     setCounter={setCounter}
                //   />
                // ) : (
                //   "Login for personalised experience"
                // )
              }
            />
            <Route
              path="/explore"
              element={
                <ExplorePage
                  recipeList={recipeList}
                  counter={counter}
                  setCounter={setCounter}
                />
              }
            />
            <Route path="/recipe/:recipeId" element={<RecipePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        {/* bottom navigation bar */}
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
      </div>
    </GlobalUseContext.Provider>
  );
}

export default App;
