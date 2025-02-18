const convertToInitials = (fullname: string) => {
  const nameParts = fullname.split(" ");

  const initials =
    nameParts[nameParts.length - 2].charAt(0) + nameParts[nameParts.length - 1].charAt(0);

  return initials.toUpperCase();
};

export default convertToInitials;
