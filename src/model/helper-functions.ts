import { cities } from "../data/cities";

const getFirstLetter = (city: string) => {
  if (city) return city.at(0)?.toLowerCase();
  else throw new Error("Invalid input in getFirstLetter");
};

export const getLastLetter = (city: string) => {
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

export const checkIfCityWasUsed = (city: string, usedCities: string[]) => {
  return usedCities.includes(city.toLowerCase());
};

export const checkIfInputStartsWithLetter = (input: string, letter: string) => {
  return input.at(0)?.toLowerCase() === letter;
};

export const getAllCitiesStartingWithLetter = (letter: string) => {
  const result = cities[letter as keyof typeof cities];
  if (!result)
    throw new Error(
      `Incorrect letter input "${letter}" in getAllCitiesStartingWithLetter`
    );
  return result;
};
