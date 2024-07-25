
export const trackEvents = (event, properties) => {
    if (event) {
        window.console.info("Event logged: ", event, properties)
        // track(event, properties);
    }
};