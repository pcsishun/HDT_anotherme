/////////// ++++++++++++++ ////////////
///////////  For Testing  ////////////
/////////// ++++++++++++++ ////////////

// const httpAPI = () => {
//     const isAPI = "http://localhost:8888/backend";
//     return isAPI;
// }

// const httpAPIWordCloud = () => {
//     const isAPI = "http://127.0.0.1:8773/faskapi"
//     return isAPI;
// }

/////////// ++++++++++++++ ////////////
/////////// For production ////////////
////////// +++++++++++++++ ///////////

const httpAPI = () => {
    const isAPI = "https://anotherme.homes/backend";
    return isAPI;
}

const httpAPIWordCloud = () => {
    const isAPI = "https://anotherme.homes/backend_wordcloud";
    return isAPI;
}


/////////// ++++++++++++++ ////////////
///////////////////////////////////////
/////////// ++++++++++++++ ////////////

export {httpAPI, httpAPIWordCloud}