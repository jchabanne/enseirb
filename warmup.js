const headOrTail = (a, b) => [a, b][Math.random() < 0.5 ? 0 : 1];

const a = headOrTail("foo", "bar");
const b = headOrTail(0, 1);
const c = headOrTail(["foo"], ["bar"]);
