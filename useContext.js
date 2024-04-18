// USe context is mainly used to avaoid prop drilling. With the help of useContext we can access the value in multiple component without passing it to the props

const UserContext = React.createContext({
  user: "Rishabh"
});


// App component - Entry point

// import UserContext

<UserContext.Provider value={defaultValue}>
  <App />
</UserContext.Provider>



// Header Component


// Import useContext
const value = useContext(UserContext);

console.log(value.user);

