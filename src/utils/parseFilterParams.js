const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isType = ['work', 'home', 'personal'].includes(contactType);

  if (isType) return contactType;
};

const parseBoolean = (boolean) => {
  if (boolean === 'true') {
    return true;
  }
  if (boolean === 'false') {
    return false;
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
