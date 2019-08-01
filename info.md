# Lovelace Google Keep card

This is a companion card for Google Keep sensor. It displays notes downloaded by integration in a friendly way, similar to Google Keep app.

![Example](https://github.com/PiotrMachowski/Lovelace-Google-Keep-card/blob/master/s1.png)


## Configuration options

| Key | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | `False` | - | Desired title of a card |
| `entity` | `string` | `True` | - | ID of Google Keep sensor |
| `theme` | `string` | `False` | `light` | Theme to be used for notes. Possible values: `light`, `dark` |
| `alpha` | `float` | `False` | 1 | Level of transparency used for notes (0 - fully transparent, 1 - not transparent) |
| `show` | `list` | `True` | - | List of sections that should be displayed. Possible values: `checked`, `unchecked` |


## Example usage:
```yaml
views:
- name: Example
  cards:
    - type: custom:google-keep-card
      entity: sensor.google_keep_12345
      theme: dark
      alpha: 0.7
      show:
        - checked
        - unchecked
```

## FAQ
* **Does this card allow editing notes?**
  
  No, right now it provides read-only view of notes.
