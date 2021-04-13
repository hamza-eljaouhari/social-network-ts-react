
const getAuthenticationToken = () : string | null => {
    return localStorage.getItem("token");
}

export default getAuthenticationToken ;