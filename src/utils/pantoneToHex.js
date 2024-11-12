"use client";

import * as simpleColorConverter from "simple-color-converter";

export default function pantoneToHex(pantone) {
  if (pantone) {
    const pantoneToHex = new simpleColorConverter({
      pantone: `pantone ${pantone}`,
      to: "hex6",
    });

    if (pantoneToHex?.color) {
      return "#" + pantoneToHex?.color;
    }

    return null;
  }
}
