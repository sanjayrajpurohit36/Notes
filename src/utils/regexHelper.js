const regexMap = {
  content: /^[ A-Za-z0-9_@,!./?#&+-]*$/,
};

export const checkContent = (data) => {
  return regexMap["content"].test(data);
};
