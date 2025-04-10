export const generateKey = (type: string, name: string) => {
    const camelName = name
      .toLowerCase()
      .split(' ')
      .map((word, i) =>
        i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  
    return `${type}-${camelName}`;
};