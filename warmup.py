from random import randint

def head_or_tail(a, b):
    return [a, b][randint(0, 1)]

a = head_or_tail("foo", "bar")
b = head_or_tail(0, 1)
c = head_or_tail(["foo"], ["bar"])

