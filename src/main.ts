const API_URL: string = "https://dog.ceo/api/breeds/image/random";

interface ResponseData {
  message: string;
  status: string;
}

interface Dom {
  button: HTMLButtonElement;
  image: HTMLImageElement;
}

const app: Dom = {
  button: document.getElementById("get-dog-button") as HTMLButtonElement,
  image: document.getElementById("good-dog-image") as HTMLImageElement,
};

const getGoodDog = async (): Promise<void> => {
  const response: Response = await fetch(API_URL);
  const goodDog: ResponseData = (await response.json()) as ResponseData;
  app.image.src = goodDog.message;
};

app.button.addEventListener("click", () => {
  void getGoodDog();
});
