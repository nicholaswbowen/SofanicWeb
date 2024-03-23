import { transform } from "./jsonTransformer.js";
const SEPARATOR = "==========";
import MD5 from "crypto-js/md5";

export const processQuotes = (binaryStr) => new Promise(
  (resolve, reject) => {
    try {
      const decoder = new TextDecoder();
      const quoteText = decoder.decode(binaryStr);
      const jsonQuotes = parseQuotes(quoteText);
      resolve(jsonQuotes);
    } catch (error) {
      reject(error);
    }
  }
)

export function parseQuotes(data, userId) {
  const readData = data.split(SEPARATOR);
  readData.pop(); // remove last empty quote due to separator

  const dataMap = readData
      .map(parseQuote)
      .filter((highlight) => highlight.quote)
      .reduce((acc, highlight) => {
        const { title, quote, date } = highlight;
        const id = MD5(title+userId).toString();
        const quoteId = MD5(quote).toString();
        const highlightObject = {
          id: quoteId,
          quote,
          date,
          alreadyIncludedInGeneration: false,
        };
        if (acc[id]) {
          acc[id].highlights.push(highlightObject);
          return acc;
        } else {
          acc[id] = {
            title, id, highlights: [highlightObject],
          };
          return acc;
        }
      }, {});

      return Object.values(dataMap)
}

function parseQuote(quote) {
  const paragraphs = quote.split("\n")
      .filter(filterParagraphs)
      .map(prepareParagraph);

  return transform(paragraphs);
}

function filterParagraphs(paragraph) {
  return paragraph !== "\r" && paragraph !== "";
}

function prepareParagraph(paragraph) {
  return paragraph.replace("\r", "");
}
