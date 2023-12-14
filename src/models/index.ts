import pako from "pako";
import { XMLValidator } from "fast-xml-parser";
import { ALSReport } from "./ALSReport";

export async function AnalizeALSFile(file: File): Promise<ALSReport> {
  try {
    const fileArrayBuffer = await file.arrayBuffer();
    const unzippedContent = pako.inflate(fileArrayBuffer, { to: "string" });

    if (!XMLValidator.validate(unzippedContent)) {
      throw new Error("Invalid XML Content");
    }

    const parser = new DOMParser();
    // console.log(unzippedContent);
    const parsedFile: XMLDocument = parser.parseFromString(
      unzippedContent,
      "text/xml",
    );
    const root = parsedFile.documentElement;

    const result = new ALSReport(file.name, root);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw error;
    } else if (typeof error === "string") {
      console.error("Error:", error);
      throw new Error(error);
    } else {
      console.error("Unknown error occurred");
      throw new Error("Unknown error occurred");
    }
  }
}
