import { SteamApp } from "@/types";
import { RisingTideGame } from "@/components/games/RisingTideGame";
import { Header } from "@/components/Header";

import data from "@/data.json";

export default async function Game() {
  const { name, description, listOfGames } = await getRandomGame();

  return (
    <>
      <Header />
      <RisingTideGame listOfGames={listOfGames} gameName={name} gameDescription={description} />
    </>
  );
}

async function getRandomGame() {
  const games = data as SteamApp[];
  const game = games.at(Math.floor(Math.random() * games.length))!;
  const gameName = game.name;
  const gameDescription = game.full_description_bbcode;
  const listOfGames = games.map((g) => g.name).toSorted();

  return {
    name: gameName,
    description: gameDescription,
    listOfGames,
  };
}
