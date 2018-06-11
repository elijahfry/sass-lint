# Toggling Rules Inside Source Files

For special cases where a particular lint doesn't make sense in a specific area of a file, special inline comments can be used to enable/disable linters. Some examples are provided below:

## Disable a rule for the entire file

```scss
// sassy-lint:disable border-zero
p {
  border: none; // No lint reported
}
```

## Disable more than 1 rule

```scss
// sassy-lint:disable border-zero, quotes
p {
  border: none; // No lint reported
  content: "hello"; // No lint reported
}
```

## Disable a rule for a single line

```scss
p {
  border: none; // sassy-lint:disable-line border-zero
}
```

## Disable all lints within a block (and all contained blocks)

```scss
p {
  // sassy-lint:disable-block border-zero
  border: none; // No result reported
}

a {
  border: none; // Failing result reported
}
```

## Disable and enable again

```scss
// sassy-lint:disable border-zero
p {
  border: none; // No result reported
}
// sassy-lint:enable border-zero

a {
  border: none; // Failing result reported
}
```

## Disable/enable all linters

```scss
// sassy-lint:disable-all
p {
  border: none; // No result reported
}
// sassy-lint:enable-all

a {
  border: none; // Failing result reported
}
```
