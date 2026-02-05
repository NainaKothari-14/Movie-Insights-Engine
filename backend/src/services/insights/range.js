export function computeRange(range) {
    const endDate = new Date();
    const startDate = new Date(endDate);
  
    if (!range || range === "7d") startDate.setDate(endDate.getDate() - 7);
    else if (range === "30d") startDate.setDate(endDate.getDate() - 30);
    else throw new Error("Invalid range. Use '7d' or '30d' (custom dates later).");
  
    return { startDate, endDate };
  }
  