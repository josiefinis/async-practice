const API_URL = "https://dog.ceo/api/breeds/image/random";
const app = {
    button: document.getElementById("get-dog-button"),
    status: document.getElementById("status"),
    image: document.getElementById("good-dog-image"),
    caption: document.querySelector("figcaption"),
};
const getBreed = (url) => {
    const regex = /breeds\/([a-z]+)-?([a-z]+)?\//;
    const result = url.match(regex);
    const breed = result ? (result[1] ?? "dog") : "dog";
    const modifier = result ? (result[2] ?? "") : "";
    return `${modifier} ${breed}`;
};
const handleError = (error) => {
    if (error instanceof Error) {
        app.status.textContent = `LOST \u{1F415} ${error.message}`;
        app.status.classList.add("error-message");
    }
    else {
        app.status.textContent = `Threw something other than an Error.`;
    }
};
const getGoodDog = async () => {
    app.status.textContent = "Loading...";
    app.caption.textContent = "";
    app.status.classList.remove("error-message");
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const goodDog = (await response.json());
        app.image.src = goodDog.message;
        app.status.textContent = "";
        app.caption.textContent = `good ${getBreed(goodDog.message)}!`;
    }
    catch (error) {
        handleError(error);
    }
};
app.button.addEventListener("click", () => {
    void getGoodDog();
});
export {};
//# sourceMappingURL=main.js.map