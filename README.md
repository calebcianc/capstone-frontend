# ChefTalk

A cooking assistant that generates and stores recipes, reads out recipe instructions and listens for user's commands for a handsfree cooking experience.

Deployment page: [ChefTalk](https://capstone-frontend-bay.vercel.app/)

## Features

- Users can add publicly available recipes to their cookbooks
- Users has four options to personally create / add recipes to their cookbooks e.g., Inputing details of a recipe manually, Pasting a recipe in text-form, Getting ChefTalk to generate a recipe based on some parameters, Getting ChefTalk to surprise the user with a recipe based on user's culinary preferences
- Users can add recipes to created cookbooks, and remove recipes from created cookbooks
- Users can edit recipes, and also toggle serving size to derive ingredient quantity
- Once user starts cooking, app reads out each instruction to the user
- Users can instruct app via voice command to doing the following
  i) repeat an instruction,
  ii) proceed to the next instruction,
  iii) return to the previous instruction,
  iv) start a timer,
  v) stop a timer,
  vi) restart a timer,
  vii) close the dialog box
- Users can also update their profile to add or remove cuisine preferences and dietary restrictions, which are ultimately used by the app to surprise users with AI-generated recipes

## Tech Used

- Front end: [React](https://react.dev/)
- UI: [Material-UI](https://mui.com/)
- Routing: [React Router](https://reactrouter.com/en/main)
- APIs: [OpenAI ChatGPT](https://platform.openai.com/docs/api-reference), [Google Text-to-Speech](https://cloud.google.com/text-to-speech#), [Unsplash](https://unsplash.com/documentation)
- Third party react hook: [React Speech Recognition](https://www.npmjs.com/package/react-speech-recognition)

## Setup

**Pre-requisite: To be used with [ChefTalk Backend](https://github.com/calebcianc/capstone-backend) in order to run the full application locally.**

This project is created using create-react-app. Before starting, it is required to run the following steps for the application to work

1. Clone repo to local

2. Configure `.env` file, make sure to get your own API keys stated below and insert it into your `.env` file

```
// Auth0 credentials
REACT_APP_DOMAIN = <REACT_APP_DOMAIN>
REACT_APP_CLIENTID = <REACT_APP_CLIENTID>
REACT_APP_AUDIENCE = <REACT_APP_AUDIENCE>

// Firebase credentials
REACT_APP_API_KEY = <REACT_APP_API_KEY>
REACT_APP_AUTH_DOMAIN = <REACT_APP_AUTH_DOMAIN>
REACT_APP_PROJECT_ID = <REACT_APP_PROJECT_ID>
REACT_APP_STORAGE_BUCKET = <REACT_APP_STORAGE_BUCKET>
REACT_APP_MESSAGING_SENDER_ID = <REACT_APP_MESSAGING_SENDER_ID>
REACT_APP_APP_ID = <REACT_APP_APP_ID>
```

3. Install all dependencies required in this repo, and run locally

```
npm i
npm start
```

## Contributors

- [Caleb Castro](https://github.com/calebcianc)
- [Chloe Li](https://github.com/khloeli)
- [Ho Ming Quan](https://github.com/kenho95)
