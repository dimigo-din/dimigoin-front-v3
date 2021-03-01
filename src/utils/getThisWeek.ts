export const getThisWeek = (date: Date) =>
  Math.ceil((date.getDate() - date.getDay() + 4) / 7);
