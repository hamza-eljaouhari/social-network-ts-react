
const isOnPage = (route: string, history: any) : boolean => {
    return route === history.location.pathname;
}

export default isOnPage ;