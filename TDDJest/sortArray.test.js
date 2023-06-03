const sortArray = require('./sortArray');

// 첫 번째 테스트 케이스는 주어진 배열을 오름차순으로 정렬하는지 확인합니다.
// 두 번째 테스트 케이스는 입력이 빈 배열일 때 빈 배열을 반환하는지 확인합니다.
// 세 번째 테스트 케이스는 이미 정렬된 배열이 주어졌을 때 동일한 배열을 반환하는지 확인합니다.
describe('sortttArray', () => {
  test('should sort an array in ascending order', () => {
    const input = [5, 2, 8, 1, 9];
    const expected = [1, 2, 5, 8, 9];
    const result = sortArray(input);
    expect(result).toEqual(expected);
  });

  test('should return an empty array if input is empty', () => {
    const input = [];
    const expected = [];
    const result = sortArray(input);
    expect(result).toEqual(expected);
  });

  test('should return the same array if it is already sorted', () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    const result = sortArray(input);
    expect(result).toEqual(expected);
  });
});