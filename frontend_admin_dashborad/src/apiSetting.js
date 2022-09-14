/////////// ++++++++++++++ ////////////
///////////  For Testing  ////////////
/////////// ++++++++++++++ ////////////

// const httpAPIEmotion = () => {
//     const isAPI = "http://localhost:8888/backend";
//     return isAPI;
// }

// const httpApiIat = () => {
//     const isAPI = "http://localhost:7878/backend_iat";
//     return isAPI;
// }


/////////// ++++++++++++++ ////////////
/////////// For production ////////////
////////// +++++++++++++++ ///////////

const httpAPIEmotion = () => {
    const isAPI = "https://anotherme.homes/backend";
    return isAPI;
}


const httpApiIat = () => {
    const isAPI = "https://anotherme.homes/backend_iat";
    return isAPI;
}

/////////// ++++++++++++++ ////////////
///////////////////////////////////////
/////////// ++++++++++++++ ////////////

export {httpAPIEmotion, httpApiIat}