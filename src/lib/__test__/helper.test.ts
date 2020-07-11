import { intersecton, difference } from '../helper'

describe('helper intersection function', () => {
        it('should return the intersection of two arrays', () => {
                const arr1: number[] = [1, 2, 3, 4]
                const arr2: number[] = [2, 3, 5, 7]

                expect(intersecton(arr1, arr2)).toStrictEqual([2, 3])
        })
})

describe('helper difference function', () => {
        it('should return the difference between two arrays/', () => {
                const arr1: number[] = [1, 2, 3, 4]
                const arr2: number[] = [2, 3, 5, 7]

                expect(difference(arr1, arr2)).toStrictEqual([1, 4])
        })
})

// describe('helper array comparator')
