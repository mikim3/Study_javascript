import unittest

class TDDTest(unittest.TestCase):
    def test_factorial(self):
        self.assertEqual(120, factorial(5))

if __name__ == '__main__':
    unittest.main()