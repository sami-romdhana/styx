import { SteamApp } from "@/types";
import { readFile } from "node:fs/promises";
import { Game as GameComponent } from "@/components/Game";
import { Header } from "@/components/Header";

export default async function Game() {
  const rawData = await readFile(DATA_PATH, "utf-8");
  const data = JSON.parse(rawData) as SteamApp[];
  const game = data.at(Math.floor(Math.random() * data.length))!;
  const gameDescription = game.full_description_bbcode;

  return (
    <>
      <Header />
      <GameComponent gameDescription={gameDescription} />
    </>
  );
}

const DATA_PATH = process.cwd() + "/src/data.json";
