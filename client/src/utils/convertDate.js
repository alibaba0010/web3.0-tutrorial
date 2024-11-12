function convertBigIntToDate(bigIntValue) {
  // Convert BigInt to Number (milliseconds)
  const milliseconds = Number(bigIntValue) * 1000;

  // Create a Date object
  const date = new Date(milliseconds);

  // Convert to locale string
  const localeString = date.toLocaleString();

  console.log(`Original BigInt: ${bigIntValue}`);
  console.log(`Converted Date: ${localeString}`);

  return localeString;
}
export default convertBigIntToDate;
