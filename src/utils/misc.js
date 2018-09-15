export const DB_URL = `https://yandexeda-7fee5.firebaseio.com/`;

export function filterRestaurants(list, catId) {
    this.list = list;
    this.catId = catId;

    let newList = [];

    if (this.catId !== 'all') {
        for (item in this.list) {
            if (this.list[item].categories.includes(this.catId)) {
                newList.push(this.list[item]);
            }
        }
    } else {
        newList = list;
    }

    return newList;
}