const API_URL: string = "https://dog.ceo/api/breeds/image/random";

interface ResponseData {
  message: string;
  status: string;
}

interface Dom {
  button: HTMLButtonElement;
  status: HTMLParagraphElement;
  image: HTMLImageElement;
  caption: HTMLElement;
}

const app: Dom = {
  button: document.getElementById("get-dog-button") as HTMLButtonElement,
  status: document.getElementById("status") as HTMLParagraphElement,
  image: document.getElementById("good-dog-image") as HTMLImageElement,
  caption: document.querySelector("figcaption") as HTMLElement,
};

const getBreed = (url: string): string => {
  const regex = /breeds\/([a-z]+)-?([a-z]+)?\//;
  const result = url.match(regex);
  const breed = result ? (result[1] ?? "dog") : "dog";
  const modifier = result ? (result[2] ?? "") : "";
  return `${modifier} ${breed}`;
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    app.status.textContent = `LOST \u{1F415} ${error.message}`;
    app.status.classList.add("error-message");
  } else {
    app.status.textContent = `Threw something other than an Error.`;
  }
};

const getGoodDog = async (): Promise<void> => {
  app.status.textContent = "Loading...";
  app.caption.textContent = "";
  app.status.classList.remove("error-message");
  try {
    const response: Response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const goodDog: ResponseData = (await response.json()) as ResponseData;
    app.image.src = goodDog.message;
    app.status.textContent = "";
    app.caption.textContent = `good ${getBreed(goodDog.message)}!`;
  } catch (error) {
    handleError(error);
  }
};

app.button.addEventListener("click", () => {
  void getGoodDog();
});
