const API_URL: string = "https://dog.ceo/api/breeds/image/random";

interface ResponseData {
  message: string;
  status: string;
}

interface Dom {
  button: HTMLButtonElement;
  status: HTMLParagraphElement;
  image: HTMLImageElement;
}

const app: Dom = {
  button: document.getElementById("get-dog-button") as HTMLButtonElement,
  status: document.getElementById("status") as HTMLParagraphElement,
  image: document.getElementById("good-dog-image") as HTMLImageElement,
};

const handleError = (error: Error | unknown) => {
  if (error instanceof Error) {
    app.status.textContent = `LOST \u{1F415} ${error.message}`;
    app.status.classList.add("error-message");
  } else {
    app.status.textContent = `Threw something other than an Error.`;
  }
};

const getGoodDog = async (): Promise<void> => {
  app.status.textContent = "Loading...";
  app.status.classList.remove("error-message");
  try {
    const response: Response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const goodDog: ResponseData = (await response.json()) as ResponseData;
    app.image.src = goodDog.message;
    app.status.textContent = "";
  } catch (error) {
    handleError(error);
  }
};

app.button.addEventListener("click", () => {
  void getGoodDog();
});
