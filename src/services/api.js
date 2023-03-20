const getQuestions = async (domain) => {
  try {
    const res = await fetch(`https://the-trivia-api.com/api/questions?categories=${domain}&limit=20`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getCategories = async () => {
  try {
    const res = await fetch(`https://the-trivia-api.com/api/categories`);
    const data = await res.json();
    const newData = Object.keys(data);
    return newData;
  } catch (error) {
    return error;
  }
};

export { getQuestions, getCategories };
