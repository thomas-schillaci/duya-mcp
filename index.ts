import { MCPServer, error, object, text, widget } from "mcp-use/server";
import { z } from "zod";

const server = new MCPServer({
  name: "duya-mcp",
  title: "duya-mcp",
  version: "1.0.0",
  description: "Outfit suggestion MCP server",
  baseUrl: process.env.MCP_URL || "http://localhost:3000",
  favicon: "favicon.ico",
});

type OutfitItem = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  imagePath: string;
};

const tops: OutfitItem[] = [
  {
    id: "top-tshirt",
    name: "Cotton T-Shirt",
    description: "Soft crewneck tee with a clean, minimal fit.",
    tags: ["casual", "street", "weekend"],
    imagePath:
      "https://images.pexels.com/photos/34156905/pexels-photo-34156905.jpeg?cs=srgb&dl=pexels-dayong-tien-681073045-34156905.jpg&fm=jpg",
  },
  {
    id: "top-shirt",
    name: "Oxford Shirt",
    description: "Crisp button-down with a structured collar.",
    tags: ["business", "smart-casual", "date"],
    imagePath:
      "https://images.pexels.com/photos/22441295/pexels-photo-22441295.jpeg?cs=srgb&dl=pexels-dayong-tien-681073045-22441295.jpg&fm=jpg",
  },
  {
    id: "top-pullover",
    name: "Merino Pullover",
    description: "Lightweight knit with refined texture.",
    tags: ["smart-casual", "winter", "work"],
    imagePath:
      "https://images.pexels.com/photos/33742466/pexels-photo-33742466.jpeg?cs=srgb&dl=pexels-elena_-sher-944248089-33742466.jpg&fm=jpg",
  },
  {
    id: "top-blazer",
    name: "Tailored Blazer",
    description: "Sharp silhouette with a polished finish.",
    tags: ["gala", "formal", "cocktail", "business"],
    imagePath:
      "https://images.pexels.com/photos/29761958/pexels-photo-29761958.jpeg?cs=srgb&dl=pexels-fotios-photos-29761958.jpg&fm=jpg",
  },
  {
    id: "top-silk-blouse",
    name: "Silk Blouse",
    description: "Draped silk with a subtle sheen.",
    tags: ["gala", "formal", "cocktail", "date"],
    imagePath:
      "https://images.pexels.com/photos/31871762/pexels-photo-31871762.jpeg?cs=srgb&dl=pexels-verolova-31871762.jpg&fm=jpg",
  },
];

const bottoms: OutfitItem[] = [
  {
    id: "bottom-jeans",
    name: "Dark Jeans",
    description: "Slim dark-wash denim with clean lines.",
    tags: ["casual", "street", "weekend"],
    imagePath:
      "https://images.pexels.com/photos/33516575/pexels-photo-33516575.jpeg?cs=srgb&dl=pexels-elena_-sher-944248089-33516575.jpg&fm=jpg",
  },
  {
    id: "bottom-chinos",
    name: "Tapered Chinos",
    description: "Cotton twill with a modern tapered leg.",
    tags: ["smart-casual", "work", "date"],
    imagePath:
      "https://images.unsplash.com/photo-1720065359628-1a9d36822df7?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    id: "bottom-pleated-trousers",
    name: "Pleated Trousers",
    description: "High-waist trousers with soft drape.",
    tags: ["formal", "gala", "business"],
    imagePath:
      "https://images.pexels.com/photos/33633245/pexels-photo-33633245.jpeg?cs=srgb&dl=pexels-rafael-oliveira-2149835472-33633245.jpg&fm=jpg",
  },
  {
    id: "bottom-pencil-skirt",
    name: "Pencil Skirt",
    description: "Structured skirt with a clean hem.",
    tags: ["business", "cocktail", "date"],
    imagePath:
      "https://cdn.pixabay.com/photo/2022/01/20/08/32/woman-6951765_1280.jpg",
  },
  {
    id: "bottom-floor-skirt",
    name: "Floor-Length Skirt",
    description: "Elegant full-length skirt with movement.",
    tags: ["gala", "formal"],
    imagePath:
      "https://cdn.pixabay.com/photo/2021/07/11/08/42/woman-6403210_1280.jpg",
  },
];

const shoes: OutfitItem[] = [
  {
    id: "shoes-sneakers",
    name: "Minimal Sneakers",
    description: "Clean leather sneakers for everyday wear.",
    tags: ["casual", "street", "weekend"],
    imagePath:
      "https://images.pexels.com/photos/32527825/pexels-photo-32527825.jpeg?cs=srgb&dl=pexels-alexander-mass-748453803-32527825.jpg&fm=jpg",
  },
  {
    id: "shoes-loafers",
    name: "Leather Loafers",
    description: "Classic loafers with a sleek profile.",
    tags: ["smart-casual", "work", "date"],
    imagePath:
      "https://images.pexels.com/photos/27063078/pexels-photo-27063078.jpeg?cs=srgb&dl=pexels-jose-martin-segura-benites-1422456152-27063078.jpg&fm=jpg",
  },
  {
    id: "shoes-oxfords",
    name: "Polished Oxfords",
    description: "Formal lace-ups with a glossy finish.",
    tags: ["formal", "gala", "business"],
    imagePath:
      "https://images.pexels.com/photos/26587838/pexels-photo-26587838.jpeg?cs=srgb&dl=pexels-rohit-sharma-1230131-26587838.jpg&fm=jpg",
  },
  {
    id: "shoes-heels",
    name: "Classic Heels",
    description: "Pointed-toe heels for evening looks.",
    tags: ["cocktail", "gala", "formal"],
    imagePath:
      "https://images.pexels.com/photos/32107582/pexels-photo-32107582.jpeg?cs=srgb&dl=pexels-melike-baran-407276327-32107582.jpg&fm=jpg",
  },
  {
    id: "shoes-ankle-boots",
    name: "Ankle Boots",
    description: "Sleek boots with a modest heel.",
    tags: ["smart-casual", "winter", "date"],
    imagePath:
      "https://images.pexels.com/photos/34976479/pexels-photo-34976479.jpeg?cs=srgb&dl=pexels-chipi1189-34976479.jpg&fm=jpg",
  },
];

const allItems = [...tops, ...bottoms, ...shoes];

function normalizeOccasion(occasion: string) {
  return occasion.trim().toLowerCase();
}

function filterByOccasion(items: OutfitItem[], occasion: string) {
  if (!occasion) return items;
  const key = normalizeOccasion(occasion);
  const filtered = items.filter((item) =>
    item.tags.some((tag) => tag.toLowerCase() === key)
  );
  return filtered.length > 0 ? filtered : items;
}

function withImageUrl(item: OutfitItem, baseUrl: string) {
  if (item.imagePath.startsWith("http://") || item.imagePath.startsWith("https://")) {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      imageUrl: item.imagePath,
    };
  }
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    imageUrl: `${baseUrl}${item.imagePath}`,
  };
}

server.tool(
  {
    name: "show-outfit-images",
    description:
      "Show selected outfit images in a widget for a given occasion",
    schema: z.object({
      occasion: z
        .string()
        .optional()
        .describe("Occasion (e.g., gala, business, date, casual)"),
      topId: z.string().describe("Selected top id"),
      bottomId: z.string().describe("Selected bottom id"),
      shoesId: z.string().describe("Selected shoes id"),
    }),
    widget: {
      name: "outfit-images",
      invoking: "Loading outfit images...",
      invoked: "Outfit images ready",
    },
  },
  async ({ occasion, topId, bottomId, shoesId }) => {
    const baseUrl = process.env.MCP_URL || "http://localhost:3000";
    const top = allItems.find((item) => item.id === topId);
    const bottom = allItems.find((item) => item.id === bottomId);
    const shoesItem = allItems.find((item) => item.id === shoesId);

    if (!top || !bottom || !shoesItem) {
      return error(
        "One or more selected items were not found. Please re-check the ids."
      );
    }

    return widget({
      props: {
        occasion,
        top: withImageUrl(top, baseUrl),
        bottom: withImageUrl(bottom, baseUrl),
        shoes: withImageUrl(shoesItem, baseUrl),
      },
      output: text("Outfit images ready"),
    });
  }
);

server.tool(
  {
    name: "list-outfit-options",
    description:
      "List tops, bottoms, and shoes tailored to a given occasion",
    schema: z.object({
      occasion: z
        .string()
        .describe("Occasion (e.g., gala, business, date, casual)"),
    }),
  },
  async ({ occasion }) => {
    const filteredTops = filterByOccasion(tops, occasion);
    const filteredBottoms = filterByOccasion(bottoms, occasion);
    const filteredShoes = filterByOccasion(shoes, occasion);

    return object({
      occasion,
      tops: filteredTops.map(({ id, name, description, tags }) => ({
        id,
        name,
        description,
        tags,
      })),
      bottoms: filteredBottoms.map(({ id, name, description, tags }) => ({
        id,
        name,
        description,
        tags,
      })),
      shoes: filteredShoes.map(({ id, name, description, tags }) => ({
        id,
        name,
        description,
        tags,
      })),
    });
  }
);

server.tool(
  {
    name: "get-outfit-images",
    description:
      "Get image URLs for selected top, bottom, and shoes by id",
    schema: z.object({
      topId: z.string().describe("Selected top id"),
      bottomId: z.string().describe("Selected bottom id"),
      shoesId: z.string().describe("Selected shoes id"),
    }),
  },
  async ({ topId, bottomId, shoesId }) => {
    const baseUrl = process.env.MCP_URL || "http://localhost:3000";
    const top = allItems.find((item) => item.id === topId);
    const bottom = allItems.find((item) => item.id === bottomId);
    const shoesItem = allItems.find((item) => item.id === shoesId);

    if (!top || !bottom || !shoesItem) {
      return error(
        "One or more selected items were not found. Please re-check the ids."
      );
    }

    return object({
      top: withImageUrl(top, baseUrl),
      bottom: withImageUrl(bottom, baseUrl),
      shoes: withImageUrl(shoesItem, baseUrl),
    });
  }
);

server.listen().then(() => {
  console.log("Server running");
});
