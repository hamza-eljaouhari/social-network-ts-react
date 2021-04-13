const isAuthenticated = () : boolean => {
    return localStorage.getItem("isAuthenticated") === "true" ? true : false;
}

export default isAuthenticated;