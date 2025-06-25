/**
 * Improved logic to convert a full name to initials.
 * - Handles multiple spaces, hyphenated names, and single-word names.
 * - Returns up to 2 initials: last and first name part, or just first if only one.
 */
const convertToInitials = (fullname: string): string => {
  if (!fullname || typeof fullname !== "string") return "";

  // Remove extra spaces and split by space
  const nameParts = fullname.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 0) return "";

  // If only one part, use first character
  if (nameParts.length === 1) {
    // Handle hyphenated single names (e.g., "Jean-Luc")
    const hyphenParts = nameParts[0].split("-");
    if (hyphenParts.length > 1) {
      return (hyphenParts[0].charAt(0) + hyphenParts[1].charAt(0)).toUpperCase();
    }
    return nameParts[0].charAt(0).toUpperCase();
  }

  // Use first character of last and first name part
  const firstInitial = nameParts[0].charAt(0);
  const lastInitial = nameParts[nameParts.length - 1].charAt(0);

  return (firstInitial + lastInitial).toUpperCase();
};

export default convertToInitials;
