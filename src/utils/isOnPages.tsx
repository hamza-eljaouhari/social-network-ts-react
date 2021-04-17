
const isOnPages = (routes: string[], history: any) : boolean => {
    return routes.some((route) => {
        return route === history.location.pathname;
    });
}

export default isOnPages ;