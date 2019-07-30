# Lovelace Google Keep card

This is a companion card for Google Keep sensor. It displays notes downloaded by integration in a friendly way, similar to Google Keep app.

![Example](https://github.com/PiotrMachowski/Lovelace-Google-Keep-card/blob/master/s1.gif)


## Configuration options

| Key | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | `False` | - | Desired title of a card |
| `entity` | `string` | `True` | - | ID of Google Keep sensor |
| `theme` | `string` | `False` | `light` | Theme to be used for notes. Possible values: `light`, `dark` |
| `alpha` | `float` | `False` | 1 | Level of transparency used for notes (0 - fully transparent, 1 - not transparent) |


## Example usage:
```yaml
views:
- name: Example
  cards:
    - type: custom:google-keep-card
      entity: sensor.google_keep_12345
      theme: dark
      alpha: 0.7
```

## Installation
1. Download [*google-keep-card.js*](https://github.com/PiotrMachowski/Lovelace-Google-Keep-card/raw/master/dist/google-keep-card.js) to `/www/custom_lovelace/google_keep_card` directory:
    ```bash
    mkdir -p www/custom_lovelace/google_keep_card
    cd www/custom_lovelace/google_keep_card/
    wget https://github.com/PiotrMachowski/Lovelace-Google-Keep-card/raw/master/dist/google-keep-card.js
    ```
2. Add card to resources in `ui-lovelace.yaml` or in raw editor if you are using frontend UI editor:
    ```yaml
    resources:
      - url: /local/custom_lovelace/google_keep_card/google-keep-card.js
        type: module
    ```
## FAQ
* **Does this card allow editing notes?**
  
  No, right now it provides read-only view of notes.