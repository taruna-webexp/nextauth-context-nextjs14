# Basic Structure of Context Api in Next Js 
This guide illustrates how to seamlessly integrate the Context API in a Next.js application, empowering you to manage state effortlessly and elevate your app's architecture.
In this project, I have implemented the Context API with Next.js to manage state effectively. Utilizing Axios for API calls, I fetch data and store it in the Context API state, allowing seamless access to this data across child components.
## About Context Api
The React Context API is a built-in feature that allows components to share data without manually passing props through each component. It's particularly useful for sharing data like user authentication, themes, or language settings across an entire app. 
For more detailed information and documentation, visit the [ContextApi Vercel](https://vercel.com/guides/react-context-state-management-nextjs).
## Build with
* [Next js](https://nextjs.org/) - A React framework for server-side rendering and static site generation..
* [MUI](https://mui.com/) - A comprehensive UI library.

##Installation
## To set up this project, follow these steps:
Install of framework and library
For Next js 
```bash 
npx create-next-app@latest
```
For Mui 
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @fontsource/roboto
npm install @mui/icons-material
```

Navigate to your project directory and install the necessary npm packages:

```bash
  npm install 
  cd my-project
```

## Project Scope
The Context API in React provides a powerful mechanism for sharing data across the component tree without the need for prop drilling. By leveraging context and context providers, developers can streamline state management, improve code maintainability, and enhance the scalability of React applications.

##Example Usage
To demonstrate how to use the Context API in your Next.js application, consider the following example:
1. Create a Context:

```
import { createContext } from "react";
const UserContext = createContext();
export default UserContext;


import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(null);



  return (
    <UserContext.Provider value={{ user, setUser, value, setValue }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
```
2 Wrap Your Application:
``` 
import UserContextProvider from "../path/to/UserContextProvider"; // Adjust the import path

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;

```
3 Consume the Context:
```
##in your submit form you can add this
import { useContext } from "react";
import UserContext from "../path/to/UserContext"; // Adjust the import path
import { useRouter } from "next/router";

const MyForm = () => {
  const { setUser, setValue } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = (data) => {
    setUser(data);
    router.push("/profile");
  };

  return (
    // Your form JSX here
  );
};

##get the props any where you want by using this
import { useContext } from "react";
import UserContext from "../path/to/UserContext"; // Adjust the import path

const SomeComponent = () => {
  const { user } = useContext(UserContext);

  return <div>User: {user ? user.name : "Guest"}</div>;
};

```
##Conclusion
Integrating the Context API into your Next.js application can significantly improve state management and component interaction. By following this guide, you can set up a scalable architecture that enhances maintainability and reusability in your projects. 
