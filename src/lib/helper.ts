/**
 * returns an array of elements, that both arr1 and arr2 contains
 * @param arr1 comparator array
 * @param arr2 comparator array
 */
const intersecton = <T extends {}>(arr1: T[], arr2: T[]): T[] => {
        return arr1.filter((item) => arr2.includes(item))
}

/**
 * return an array of elements that is contained in arr1, but aren't contained in arr2
 * @param arr1 original array, contains elements to be returned
 * @param arr2 comparator array. Also not single element from this array would be returned
 */
const difference = <T extends {}>(arr1: T[], arr2: T[]): T[] => {
        return arr1.filter((item) => !arr2.includes(item))
}

const compareArr = <T extends {}>(arr1: T[], arr2: T[]): boolean => {
        if (arr1.length !== arr2.length) return false
        arr1.forEach((item, index) => {
                for (let propertyName in item) {
                        if (item[propertyName] !== arr2[index][propertyName]) {
                                return false
                        }
                }
        })
        return true
}

export { intersecton, compareArr, difference }
