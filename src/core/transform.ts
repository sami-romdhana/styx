import parse from "@bbob/parser";

export function transformBBCode(bbCode: string): string[] {
  const parsed = parse(bbCode.replaceAll(/\{STEAM_APP_IMAGE\}[/a-zA-Z0-9.-_]+/g, ""), {});

  function loopOverNodes(part: any): string {
    if (typeof part === "object") {
      if (part.content !== undefined && Array.isArray(part.content)) {
        return part.content.flatMap(loopOverNodes).join("").concat("\r\n");
      }
    }

    return part.toString();
  }

  return parsed
    .map(loopOverNodes)
    .join("")
    .split(/\r\n?/)
    .map((line) => line.trim())
    .filter((line) => line.length);
}
