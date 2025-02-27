const GIPHY_API_KEY = "9z1kpjNsGO7a3LVABU20FB3OfbCQnJYj";

export const fetchJokeAndGif = async () => {
  try {
    const jokeRes = await fetch("https://official-joke-api.appspot.com/random_joke");
    const jokeData = await jokeRes.json();
    const jokeText = `${jokeData.setup} - ${jokeData.punchline}`;

    const keyword = jokeData.punchline.split(" ")[0];
    const gifRes = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=1`
    );
    const gifData = await gifRes.json();

    return { jokeText, gifUrl: gifData.data.length > 0 ? gifData.data[0].images.fixed_height.url : null };
  } catch (error) {
    return { jokeText: "Oops! Couldn't fetch a joke. Try again!", gifUrl: null };
  }
};
