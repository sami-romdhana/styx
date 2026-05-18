import { SteamApp } from "@/types";
import { Game as GameComponent } from "@/components/Game";
import { Header } from "@/components/Header";

import data from "@/data.json";

export default async function Game() {
  const { name, description } = await getRandomGame();

  return (
    <>
      <Header />
      <GameComponent gameName={name} gameDescription={description} />
    </>
  );
}

async function getRandomGame() {
  const games = data as SteamApp[];
  const game = games.at(Math.floor(Math.random() * games.length))!;
  const gameName = game.name;
  const gameDescription = game.full_description_bbcode;

  return {
    name: gameName,
    description: gameDescription,
  };
}
