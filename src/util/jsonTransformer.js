export function transform(paragraph) {

  return Object.assign(
      {title: paragraph[0]},
      getTimeDetails(paragraph[1]),
      { quote: paragraph[2] },
  );
}

function getTimeDetails(time) {
  const dateOfCite = time.split("|").pop();

  return {
    date: new Date(dateOfCite.trim()),
  };
}
