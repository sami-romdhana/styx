import { it, expect } from "vitest";
import { parseText, SentenceNode } from "./parse";

const testCases: TestCase[] = [
  {
    input: 'All CAPS (where-did-this "come from"?) even... ... it\'s*',
    output: [
      {
        type: "text",
        content: "All",
        key: "all",
      },
      {
        type: "punctuation",
        content: " ",
        key: " ",
      },
      {
        type: "text",
        content: "CAPS",
        key: "caps",
      },
      {
        type: "punctuation",
        content: " (",
        key: " (",
      },
      {
        type: "text",
        content: "where",
        key: "where",
      },
      {
        type: "punctuation",
        content: "-",
        key: "-",
      },
      {
        type: "text",
        content: "did",
        key: "did",
      },
      {
        type: "punctuation",
        content: "-",
        key: "-",
      },
      {
        type: "text",
        content: "this",
        key: "this",
      },
      {
        type: "punctuation",
        content: ' "',
        key: ' "',
      },
      {
        type: "text",
        content: "come",
        key: "come",
      },
      {
        type: "punctuation",
        content: " ",
        key: " ",
      },
      {
        type: "text",
        content: "from",
        key: "from",
      },
      {
        type: "punctuation",
        content: '"?) ',
        key: '"?) ',
      },
      {
        type: "text",
        content: "even",
        key: "even",
      },
      {
        type: "punctuation",
        content: "... ... ",
        key: "... ... ",
      },
      {
        type: "text",
        content: "it",
        key: "it",
      },
      {
        type: "punctuation",
        content: "'",
        key: "'",
      },
      {
        type: "text",
        content: "s",
        key: "s",
      },
      {
        type: "punctuation",
        content: "*",
        key: "*",
      },
    ],
  },
];

testCases.forEach((testCase) => {
  it("should produce pure text", () => {
    expect(parseText(testCase.input)).toEqual(testCase.output);
  });
});

interface TestCase {
  input: string;
  output: SentenceNode[];
}
