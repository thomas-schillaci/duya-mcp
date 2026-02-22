# MCP Closet

MCP Closet is a constraint-aware interactive decision engine built as an MCP
App.

Instead of positioning the project as an "AI stylist," this demo focuses on a
core MCP architecture pattern:

`natural language -> tool call -> structured data -> widget -> stateful interaction`

## Please note

This works well using ChatGPT conected to the MCP server hosted on Manufact, but for some reason Manufact Agent in chat mode doesn't output anything.

## Why This Project Exists

The goal is to show how an LLM can drive decisions with explicit constraints,
then hand off to an interactive UI for fast human validation.

In this demo, the domain is fashion. The pattern is general.

## Current Scope

The current implementation intentionally stays small and focused:

- Curated catalog of tops, bottoms, and shoes
- Context-based filtering from user intent (for example, occasion)
- Structured tool outputs for reliable model selection
- Three-carousels widget for side-by-side visual comparison
- Live total price shown in the widget
- `add-to-basket` tool is available now and accepts selected ids
- Basket flow is partially implemented today (`add-to-basket` returns `OK`);
  full persisted basket + checkout flow is future work

## Architecture Pattern

1. User provides natural-language intent.
2. The model calls a tool to retrieve constrained options.
3. The server returns structured data (ids, labels, metadata, pricing).
4. The model calls a widget-rendering tool with selected ids.
5. The widget enables stateful interaction and displays live pricing.
6. The model can call follow-up tools (for example `add-to-basket`) using the
   chosen ids.

This model-tool-widget loop is the key idea demonstrated by the project.

## Tools

- `list-outfit-options`  
  Input: `{ "occasion": "gala" }`  
  Output: structured options + ids for tops, bottoms, shoes

- `show-outfit-images`  
  Input: `{ "topId": "...", "bottomId": "...", "shoesId": "..." }`  
  Output: widget with three carousels and live total price

- `add-to-basket`  
  Input: `{ "topId": "...", "bottomId": "...", "shoesId": "..." }`  
  Output: confirmation (`OK`)  
  Status: available and partially implemented; full basket persistence is
  planned

## Minimal Demo by Design

The inventory is intentionally minimal. It is not meant to be a production
catalog; it is designed to make the model-tool-widget loop easy to understand,
inspect, and extend.

## Beyond Fashion

The same architecture can support many domains where decisions must satisfy
constraints and remain interactive, such as:

- Travel package selection
- Course or training path planning
- Insurance plan comparison
- Real estate shortlisting
- B2B procurement workflows

## Extensibility Roadmap

Planned extensions include:

- Budget-aware constraint handling
- Weather-aware recommendations
- Re-ranking based on user interaction feedback
- Live inventory and pricing connectors to external systems
- End-to-end basket persistence and checkout integration

## Thank you

Built by Mehdi and Thomas for the YCombinator Manufact hackathon.
