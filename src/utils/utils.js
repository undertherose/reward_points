export const calculatePoints = (transactionAmount) => {
  let points = 0;

  if (transactionAmount > 100) {
    points += 2 * (transactionAmount - 100);
  }
  if (transactionAmount > 50) {
    points += 1 * Math.min(transactionAmount - 50, 50);
  }

  return points;
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export function getLast3Months() {
  const today = new Date();
  const month = today.getMonth();
  const last3Months = [];
  for (var i = 2; i >= 0; i--) {
    const curr = month - i;
    if (curr < 0) {
      last3Months.push(12 + curr);
    } else {
      last3Months.push(curr);
    }
    // console.log(last3Months)
  }
  return last3Months;
}

export function threeMonthsPrior(date) {
  // Copy date so don't affect original
  var d = new Date(date);
  // Get the current month number
  var m = d.getMonth();
  // Subtract 6 months
  d.setMonth(d.getMonth() - 3);
  // If the new month number isn't m - 6, set to last day of previous month
  // Allow for cases where m < 6
  var diff = (m + 12 - d.getMonth()) % 12;
  if (diff < 3) d.setDate(0);
  return d;
}

export function formatDate(d) {
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
