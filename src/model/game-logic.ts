import { cities } from "../data/cities";

const getFirstLetter = (city: string) => {
  if (city) return city.at(0)?.toLowerCase();
  else throw new Error("Invalid input in getFirstLetter");
};

const getLastLetter = (city: string) => {
  if (city && city.length > 1) {
    const lastLetter = city.at(-1)?.toLowerCase();
    if (lastLetter !== "ъ" && lastLetter !== "ь") return lastLetter;
    else return city.at(-2)?.toLowerCase();
  } else throw new Error("Invalid input in getFirstLetter");
};

export const validateCity = (city: string) => {
  if (!city || city.length < 2) return false;

  const firstLetter = getFirstLetter(city) as keyof typeof cities;
  if (!cities[firstLetter]) return false;

  const citiesStartingOnFirstLetter = cities[firstLetter].map((city) =>
    city.toLowerCase()
  );

  return citiesStartingOnFirstLetter.includes(city.toLowerCase());
};
