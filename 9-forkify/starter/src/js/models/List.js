import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };

    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    // [2,4,8] splice(1,2) -> returns [4, 8] original array is now [2]
    // [2,4,8] slice(1,2)  -> returns 4, orginal array is [2,4,8]

    // find the index of the element, where the saved element ID is the same as the passed in index
    const index = this.items.findIndex(el => el.id === id);
    // delete the element
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
