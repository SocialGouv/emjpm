import fetch from "isomorphic-fetch";

const getPostCodeCoordinates = postCode => {
    // return null if no input
    if (!postCode || !postCode.trim()) {
        return Promise.resolve(null);
    }
    return fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`).then(response =>
        response.json()
    );
};


export default getPostCodeCoordinates;