//Define a JavaScript function that takes a number of minutes as an argument and returns a string in the format "Xh Ym" where X is the number of hours and Y is the number of minutes.

export default function formatRuntime(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}


