function cypher(value) {
    return Array.from(value).map(() => "-").join("");
}

module.exports = {cypher};
