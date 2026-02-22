# MCP Closet

An MCP App that turns outfit selection into a fast, visual decision flow.
Clients describe the occasion, discover curated items, and render a
three‑carousel widget with pricing — all inside ChatGPT.

## What It Does

- Curated catalog: tops, bottoms, shoes with descriptions and prices
- Tool‑driven discovery for LLM selection
- Widget with three carousels, selected items first
- Total price computed live at the bottom

## Tools

- `list-outfit-options`  
  Input: `{ "occasion": "gala" }`  
  Output: descriptions + ids for tops, bottoms, shoes

- `show-outfit-images`  
  Input: `{ "topId": "...", "bottomId": "...", "shoesId": "..." }`  
  Output: widget with carousels and total price

- `add-to-basket`  
  Input: `{ "topId": "...", "bottomId": "...", "shoesId": "..." }`  

## Thank you

Built in 3h by Mehdi and Thomas for the YCombinator Manufact hackathon.
