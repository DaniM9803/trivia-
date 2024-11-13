
export const navigate = (endpoint) => {
    window.history.pushState({}, '', endpoint);
}