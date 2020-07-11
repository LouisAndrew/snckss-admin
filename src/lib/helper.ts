const intersecton = <T extends {}>(arr1: T[], arr2: T[]): T[] => {
        return arr1.filter((item) => arr2.includes(item))
}

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
