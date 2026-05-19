import { it, expect } from "vitest";
import { transformBBCode } from "./transform";

const testCases: TestCase[] = [
  {
    input:
      "[p][/p][p]Subnautica 2 is an underwater survival adventure game set on an all-new alien world. It is the next chapter in the Subnautica universe, developed by Unknown Worlds. [/p][p]Driven from your home by ongoing conflict, Alterra offers you the chance at a new life. But as the colony ship CICADA shepherds you and your fellow Pioneers to your new home, something goes awry. The ship’s AI insists that your mission should continue. Stranded and faced with near-insurmountable odds, you must do everything in your power to survive. The future of humanity on this world is in your hands.[/p][p][/p][p][/p][h2]PLAY ALONE OR WITH FRIENDS [/h2][p]Subnautica 2 is being crafted as a single-player experience that you can optionally play in online co-operative multiplayer with up to three friends. You can choose from four pre-designed characters, with more characters and customization options coming throughout Early Access. Work together to explore long-forgotten ruins and learn to adapt to a planet that might not want you there.[/p][p][/p][p][/p][h2]ADAPT TO SURVIVE [/h2][p]To survive the depths and make this planet your home, you’ll need to utilize all the tools at your disposal. Traverse vibrant and breathtaking biomes with your Tadpole submersible. Design and customize bases to return to when your adventures push you beyond the safety of shallow waters. As Early Access develops, so too will your array of tools, equipment, and vehicles. Upgrades will help push you beyond your boundaries and unlock the secrets of this strange world.[/p][p][/p][p][/p][h2]EXPLORE THE UNKNOWN [/h2][p]Scan and study a rich world of biodiversity to understand life here. Discover everything from the smallest creatures to towering Leviathans. Experience the wonder, and sometimes danger, lurking around every corner. Every dive is an opportunity to uncover why the ship's AI is so determined to continue the mission and what mysteries lie beneath the surface of this breathtaking new frontier.[/p][p][/p][p][/p][h2]DESIGNED FOR EARLY ACCESS [/h2][p]Subnautica 2 is an Early Access title in active development. Throughout this journey, we will continuously expand the world with additional biomes, creatures, and craftables, while expanding the narrative. You may encounter bugs, in-development features, and performance issues. Your feedback is the cornerstone of our development process. Join us and help shape the next chapter of the Subnautica universe.[/p][p][/p][p][/p][h2]CRAFTED BY UNKNOWN WORLDS [/h2][p]Subnautica 2 is being developed by Unknown Worlds, the studio behind the award-winning Subnautica and Subnautica: Below Zero. Our journey began with the 2003 Half-Life mod Natural Selection, and today we have evolved into a fully remote, globally distributed team spanning from the United States to the United Kingdom, France, Australia, and beyond. Defined by a philosophy of open development and over a decade of community-focused innovation, we invite you to dive back into the depths with a studio dedicated to pushing the boundaries of the survival genre.[/p][h2]Welcome aboard, Pioneer.[/h2]",
    output: [
      "Subnautica 2 is an underwater survival adventure game set on an all-new alien world. It is the next chapter in the Subnautica universe, developed by Unknown Worlds.",
      "Driven from your home by ongoing conflict, Alterra offers you the chance at a new life. But as the colony ship CICADA shepherds you and your fellow Pioneers to your new home, something goes awry. The ship’s AI insists that your mission should continue. Stranded and faced with near-insurmountable odds, you must do everything in your power to survive. The future of humanity on this world is in your hands.",
      "PLAY ALONE OR WITH FRIENDS",
      "Subnautica 2 is being crafted as a single-player experience that you can optionally play in online co-operative multiplayer with up to three friends. You can choose from four pre-designed characters, with more characters and customization options coming throughout Early Access. Work together to explore long-forgotten ruins and learn to adapt to a planet that might not want you there.",
      "ADAPT TO SURVIVE",
      "To survive the depths and make this planet your home, you’ll need to utilize all the tools at your disposal. Traverse vibrant and breathtaking biomes with your Tadpole submersible. Design and customize bases to return to when your adventures push you beyond the safety of shallow waters. As Early Access develops, so too will your array of tools, equipment, and vehicles. Upgrades will help push you beyond your boundaries and unlock the secrets of this strange world.",
      "EXPLORE THE UNKNOWN",
      "Scan and study a rich world of biodiversity to understand life here. Discover everything from the smallest creatures to towering Leviathans. Experience the wonder, and sometimes danger, lurking around every corner. Every dive is an opportunity to uncover why the ship's AI is so determined to continue the mission and what mysteries lie beneath the surface of this breathtaking new frontier.",
      "DESIGNED FOR EARLY ACCESS",
      "Subnautica 2 is an Early Access title in active development. Throughout this journey, we will continuously expand the world with additional biomes, creatures, and craftables, while expanding the narrative. You may encounter bugs, in-development features, and performance issues. Your feedback is the cornerstone of our development process. Join us and help shape the next chapter of the Subnautica universe.",
      "CRAFTED BY UNKNOWN WORLDS",
      "Subnautica 2 is being developed by Unknown Worlds, the studio behind the award-winning Subnautica and Subnautica: Below Zero. Our journey began with the 2003 Half-Life mod Natural Selection, and today we have evolved into a fully remote, globally distributed team spanning from the United States to the United Kingdom, France, Australia, and beyond. Defined by a philosophy of open development and over a decade of community-focused innovation, we invite you to dive back into the depths with a studio dedicated to pushing the boundaries of the survival genre.",
      "Welcome aboard, Pioneer.",
    ],
  },
  {
    input:
      "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.\r\n\r\nA free upgrade to CS:GO, Counter-Strike 2 marks the largest technical leap in Counter-Strike’s history. Built on the Source 2 engine, Counter-Strike 2 is modernized with realistic physically-based rendering, state of the art networking, and upgraded Community Workshop tools.\r\n\r\nIn addition to the classic objective-focused gameplay that Counter-Strike pioneered in 1999, Counter-Strike 2 features:\r\n\r\n[list][*]All-new CS Ratings with the updated Premier mode\r\n[/*][*]Global and Regional leaderboards\r\n[/*][*]Upgraded and overhauled maps\r\n[/*][*]Game-changing dynamic smoke grenades\r\n[/*][*]Tick-rate-independent gameplay\r\n[/*][*]Redesigned visual effects and audio\r\n[/*][*]All items from CS:GO moving forward to CS2[/*][/list]",
    output: [
      "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.",
      "A free upgrade to CS:GO, Counter-Strike 2 marks the largest technical leap in Counter-Strike’s history. Built on the Source 2 engine, Counter-Strike 2 is modernized with realistic physically-based rendering, state of the art networking, and upgraded Community Workshop tools.",
      "In addition to the classic objective-focused gameplay that Counter-Strike pioneered in 1999, Counter-Strike 2 features:",
      "All-new CS Ratings with the updated Premier mode",
      "Global and Regional leaderboards",
      "Upgraded and overhauled maps",
      "Game-changing dynamic smoke grenades",
      "Tick-rate-independent gameplay",
      "Redesigned visual effects and audio",
      "All items from CS:GO moving forward to CS2",
    ],
  },
  {
    input:
      "[img=http://STEAM_APP_IMAGE}/extras/Steam_angela.png fromclient=1]{STEAM_APP_IMAGE}/extras/Steam_angela.png[/img]\r\n\r\n[b][h2]“May you find your book in this place.”[/h2][/b]\r\n\r\nBecome the owner of the Library and receive your guests.\r\n\r\nYour librarians will fight for the Library.",
    output: [
      "“May you find your book in this place.”",
      "Become the owner of the Library and receive your guests.",
      "Your librarians will fight for the Library.",
    ],
  },
];

testCases.forEach((testCase) => {
  it("should produce pure text", () => {
    expect(transformBBCode(testCase.input)).toEqual(testCase.output);
  });
});

interface TestCase {
  input: string;
  output: string[];
}
