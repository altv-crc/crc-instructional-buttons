# [CRC][TS] alt:V Instructional Buttons

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

This is considered a utility component for rendering instructional buttons through events.

## Requires

- [alt:V TypeScript Project](https://github.com/Stuyk/altv-typescript)
- [VSCode - alt:V Event Suggestions](https://marketplace.visualstudio.com/items?itemName=stuyk.altv-event-suggestions)

_Highly recommended to get the extension, for better event handling._

## Installation

1. Create a folder in your `src` folder called `crc-instructional-buttons`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-login`.

```
resources = [ 
    'crc-db',
    'crc-instructional-buttons',
    'crc-login',
    'core',
    'dbg_reconnect'
]
```

_Your resource structure may vary_

## Usage

* [Control List](https://altv.stuyk.com/docs/articles/tables/controls.html)

### Showing Buttons

```ts
alt.emit('crc-instructional-buttons', {
    set: [
        { text: 'Back / Exit', input: '~INPUT_FRONTEND_RRIGHT~' },
        { text: 'Enter', input: '~INPUT_FRONTEND_RDOWN~' },
        { text: 'Change', input: '~INPUTGROUP_CELLPHONE_NAVIGATE_LR~' },
        { text: 'Navigate', input: '~INPUTGROUP_CELLPHONE_NAVIGATE_UD~' },
    ],
});
```

### Hiding Buttons

```ts
alt.emit('crc-instructional-buttons', { clear: true });
```

# Preview

![](https://i.imgur.com/jPYWM0z.png)