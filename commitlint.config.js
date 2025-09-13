module.exports = {
  rules: {
    "type-enum": [
      2,
      "always",
      ["FEAT", "FIX", "DOCS", "STYLE", "REFACTOR", "TEST", "CHORE"],
    ],
    "type-case": [2, "always", "upper-case"],
    "subject-empty": [2, "never"],
    "header-max-length": [2, "always", 72],
  },
};
