# Lovelace Google Keep card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)
[![Community Forum](https://img.shields.io/badge/community-forum-brightgreen.svg?style=popout)](https://community.home-assistant.io/t/google-keep-custom-component-and-lovelace-card/131752)
[![buymeacoffee_badge](https://img.shields.io/badge/Donate-Buy%20Me%20a%20Coffee-ff813f?style=flat)](https://www.buymeacoffee.com/PiotrMachowski)
[![paypalme_badge](https://img.shields.io/badge/Donate-PayPal-0070ba?style=flat)](https://paypal.me/PiMachowski)

This is a companion card for [Google Keep sensor](https://github.com/PiotrMachowski/Home-Assistant-custom-components-Google-Keep). It displays notes downloaded by integration in a friendly way, similar to Google Keep app.

![Example](https://github.com/PiotrMachowski/Lovelace-Google-Keep-card/blob/master/s1.png)


## Configuration options

| Key | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | `False` | - | Desired title of a card |
| `entity` | `string` | `True` | - | ID of Google Keep sensor |
| `theme` | `string` | `False` | `light` | Theme to be used for notes. Possible values: `light`, `dark`, `auto` |
| `alpha` | `float` | `False` | 1 | Level of transparency used for notes (0 - fully transparent, 1 - not transparent) |
| `show` | `list` | `True` | - | List of sections that should be displayed. Possible values: `checked`, `unchecked` |
| `hide_if_empty` | `boolean` | `False` | `false` | Enables hiding cart when there are no notes found. Possible values: `true`, `false` |
| `systemBox` | `boolean` | `False` | `false` | Make each note a HA tile instead of emcapsulate them into a HA tile |
| `forceBackground` | `boolean` | `False` | `false` | Force the background to white/black according to the theme |
| `smallTitleMargin` | `boolean` | `False` | `false` | Allow to reduce the bottom margin of the title even further |

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

<a href="https://www.buymeacoffee.com/PiotrMachowski" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
