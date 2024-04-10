// mock data
const catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((item) => item.cat_id == id);
};

const addCat = (cat, file) => {
  const {cat_name, weight, owner, filename, birthdate} = cat; // Destructuring to get the filename
  const newId = catItems.length > 0 ? catItems[0].cat_id + 1 : 1; // Ensure there's a fallback for an empty array

  catItems.unshift({
    cat_id: newId,
    cat_name,
    weight,
    owner: Number(owner),
    filename,
    birthdate,
    file,
  });

  return {cat_id: newId, file};
};

export {listAllCats, findCatById, addCat};