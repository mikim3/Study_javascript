import unittest

## 실제 기능을 이후에 개발
def factorial(i):
    if i > 1:
        return i * factorial(i-1)
    else:
        return i

## 이 밑에 5줄을 먼저 개발
class TDDTest(unittest.TestCase):
    def test_factorial(self):
        self.assertEqual(120, factorial(5))

if __name__ == '__main__':
    unittest.main()