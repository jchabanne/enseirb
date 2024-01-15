__jackpot_symbol__ = "$"


def slot_machine(bet, result):
    factor = __get_pattern_factor__(result)
    return bet * factor


def __get_pattern_factor__(result):
    a, b, c = result
    if a == b and a == c:
        return 20 if (a == __jackpot_symbol__) else 5
    if a == b or b == c:
        return 2
    return 0
