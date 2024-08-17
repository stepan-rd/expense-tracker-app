/**
 * Converts milliseconds to a formatted date string (MMM:DD:YYYY).
 * @param {number} ms - The milliseconds since the UNIX epoch.
 * @returns {string} - The formatted date string in MMM:DD:YYYY format.
 */
export function formatMsToDate(ms: number): string {
  const date = new Date(ms);

  // Extracting the parts of the date
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const month = formatter.format(date);
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  // Returning the formatted string
  return `${month} ${day} ${year}`;
}
