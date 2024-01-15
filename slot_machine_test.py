import unittest

from slot_machine import slot_machine


class SlotMachineTest(unittest.TestCase):
    def test_gain_is_bet_x2_if_the_two_first_symbols_are_the_same(self):
        result = ["+", "+", "1"]

        gain = slot_machine(5, result)

        self.assertEqual(gain, 10)

    def test_gain_is_bet_x2_if_the_two_last_symbols_are_the_same(self):
        result = [".", "+", "+"]

        gain = slot_machine(10, result)

        self.assertEqual(gain, 20)

    def test_gain_is_bet_x5_if_all_the_symbols_are_the_same(self):
        result = ["?", "?", "?"]

        gain = slot_machine(20, result)

        self.assertEqual(gain, 100)

    def test_gain_is_bet_x20_if_all_symbols_are_jackpot(self):
        result = ["$", "$", "$"]

        gain = slot_machine(10, result)

        self.assertEqual(gain, 200)

    def test_gain_is_0_if_no_symbol_pattern(self):
        result = ["+", ".", "+"]

        gain = slot_machine(5, result)

        self.assertEqual(gain, 0)


if __name__ == "__main_":
    unittest.main()
