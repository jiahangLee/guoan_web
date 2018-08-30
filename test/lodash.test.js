/* eslint-disable no-undef */
import _ from 'lodash'

test('adds 1 + 2 to equal 3', () => {
  expect(_.sum([1, 2])).toEqual(3)
})

test('find max value', () => {
  expect(_.max([3, 4, 5, 6, 7])).toEqual(7)
})
