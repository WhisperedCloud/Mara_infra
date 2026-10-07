/**
 * MARA INFRA SOLUTIONS - PRODUCT CATALOG DATA
 * Authentic construction chemicals, tile adhesives, epoxy grouts, waterproofing, and glazing systems.
 * Strictly NO pricing or rate information as per requirement.
 */

const products = [
    {
        id: "weber-set-polymer",
        name: "Weber Set Polymer Tile Adhesive",
        brand: "Weber",
        category: "adhesives",
        categoryName: "Tile & Stone Adhesives",
        image: "assets/images/weber_tile_adhesive.png",
        shortDescription: "High-performance polymer-modified cementitious tile adhesive for ceramic, vitrified tiles, and natural stone.",
        description: "Weber Set Polymer is a high-bond, polymer-modified cementitious adhesive formulated for internal and external floor and wall tiling. Suitable for fixing vitrified tiles, natural stones, and granite on demanding substrates including tile-on-tile applications.",
        applications: [
            "Internal and external floor tiling",
            "Internal vertical wall cladding up to 3 meters",
            "Tile-on-tile refurbishment projects",
            "Fixing vitrified tiles and natural granite/marble"
        ],
        substrates: [
            "Cement screed and plaster",
            "Existing ceramic and vitrified tiles",
            "Concrete blocks and brick masonry",
            "Cement fiber boards"
        ],
        features: [
            "High polymer content for superior bond strength",
            "No pre-soaking of tiles required",
            "Extended open time for easy adjustment during installation",
            "Zero vertical slip on wall applications",
            "Water and shock resistant"
        ],
        specifications: {
            packaging: "20 kg & 50 kg moisture-resistant bags",
            appearance: "Grey or White powder",
            mixingRatio: "Approx. 4.5 - 5.0 liters of water per 20 kg bag",
            openTime: "20 - 30 minutes at 27°C",
            potLife: "3 hours at 27°C",
            curingTime: "24 hours for foot traffic",
            coverage: "Approx. 3.5 - 4.0 sq.m per 20 kg bag (at 3mm bed thickness)"
        },
        documents: [
            {
                name: "Technical Data Sheet (TDS)",
                url: "#",
                fileSize: "245 KB"
            },
            {
                name: "Application Guide & Safety Sheet",
                url: "#",
                fileSize: "512 KB"
            }
        ]
    },
    {
        id: "weber-color-epoxy",
        name: "Weber Color Epoxy Grout",
        brand: "Weber",
        category: "grouts",
        categoryName: "Tile & Stone Joint Fillers",
        image: "assets/images/epoxy_grout.png",
        shortDescription: "100% stain-proof, chemical-resistant 3-component resinous epoxy tile grout for hygienic joints.",
        description: "Weber Color Epoxy is a high-grade 3-part resinous epoxy tile grout designed for heavy-duty chemical resistance, hygiene, and zero absorption. Formulated for kitchens, bathrooms, laboratories, and commercial swimming pools where stain resistance and durability are critical.",
        applications: [
            "Kitchen counter joints and splashbacks",
            "Commercial & residential swimming pools",
            "Hospitals, laboratories, and food processing units",
            "Heavy traffic commercial floors and luxury bathrooms"
        ],
        substrates: [
            "Ceramic and vitrified tile joints",
            "Granite, marble, and natural stone joints",
            "Glass mosaic tiles"
        ],
        features: [
            "100% stain-resistant and waterproof",
            "High chemical and acid resistance",
            "Available in 40+ color shades to match tile aesthetics",
            "Fungus and bacteria resistant surface",
            "High mechanical strength and non-shrinking"
        ],
        specifications: {
            packaging: "1 kg & 5 kg 3-component kits",
            appearance: "Uniform colored paste when mixed",
            mixingRatio: "Part A (Resin) + Part B (Hardener) + Part C (Colored Filler)",
            potLife: "45 minutes at 27°C",
            curingTime: "Full chemical cure in 7 days",
            jointWidth: "2 mm to 12 mm"
        },
        documents: [
            {
                name: "Weber Color Epoxy Technical Data Sheet",
                url: "#",
                fileSize: "320 KB"
            },
            {
                name: "Color Shade Card Guide",
                url: "#",
                fileSize: "1.2 MB"
            }
        ]
    },
    {
        id: "weber-dry-protect",
        name: "Weber Dry Protect Coating",
        brand: "Weber",
        category: "waterproofing",
        categoryName: "Waterproofing",
        image: "assets/images/waterproofing.png",
        shortDescription: "Two-component polymer-modified elastomeric waterproof coating for roofs, terraces, and water tanks.",
        description: "Weber Dry Protect is a high-performance 2-component cementitious elastomeric waterproof coating. When applied, it forms a seamless flexible membrane that bridges hairline concrete cracks and prevents water penetration under continuous hydrostatic pressure.",
        applications: [
            "Flat and sloped roof terraces",
            "Under-tile waterproofing in toilets and bathrooms",
            "Water retaining structures and swimming pools",
            "Retaining walls and basement external surfaces"
        ],
        substrates: [
            "Concrete roof slabs and screeds",
            "Brick and block masonry",
            "Cementitious renders and plasters"
        ],
        features: [
            "Seamless elastomeric crack-bridging membrane",
            "Excellent adhesion to concrete and masonry",
            "UV resistant for exposed terrace applications",
            "Non-toxic - safe for potable water storage tanks",
            "Resists negative and positive water pressure"
        ],
        specifications: {
            packaging: "20 kg Kit (Powder + Liquid Polymer)",
            appearance: "Grey elastomeric slurry when mixed",
            mixingRatio: "Powder : Liquid = 2.5 : 1 by weight",
            potLife: "45 minutes at 30°C",
            recoatTime: "4 - 6 hours",
            elongation: "> 100% at break"
        },
        documents: [
            {
                name: "Waterproofing System Technical Datasheet",
                url: "#",
                fileSize: "410 KB"
            }
        ]
    },
    {
        id: "weber-primer-401",
        name: "Weber Primer 401",
        brand: "Weber",
        category: "add-ons",
        categoryName: "Add-On Chemicals",
        image: "assets/images/addon_chem.png",
        shortDescription: "Synthetic acrylic primer for porous substrates prior to tile adhesive and self-leveling underlayment application.",
        description: "Weber Primer 401 is a deep-penetrating, water-based synthetic acrylic resin primer formulated to seal porous plaster, concrete, and screed surfaces, improving adhesion and preventing rapid water loss from mortar beds.",
        applications: [
            "Priming porous concrete and cement plasters",
            "Pre-treatment before applying tile adhesives",
            "Substrate preparation for self-leveling compounds"
        ],
        substrates: [
            "Porous concrete and aerated blockwork",
            "Gypsum board and cement boards",
            "Cementitious renders"
        ],
        features: [
            "Reduces substrate porosity and absorption",
            "Consolidates weak surface particles",
            "Improves bond strength of adhesives and leveling coats",
            "Solvent-free and eco-friendly",
            "Easy brush or roller application"
        ],
        specifications: {
            packaging: "1 Liter & 5 Liter carboys",
            appearance: "Milky white liquid (dries clear)",
            ph: "7.0 - 8.5",
            dryingTime: "1 to 2 hours depending on humidity",
            consumption: "100 - 150 ml / sq.m depending on porosity"
        },
        documents: [
            {
                name: "Weber Primer 401 TDS",
                url: "#",
                fileSize: "180 KB"
            }
        ]
    },
    {
        id: "weberwall-finecoat",
        name: "Weberwall Finecoat Finishing Mortar",
        brand: "Weber",
        category: "wall-solutions",
        categoryName: "Weberwall Finecoat",
        image: "assets/images/weberwall_finecoat.png",
        shortDescription: "Premium polymer-modified thin-bed plaster and smoothing mortar for interior and exterior walls.",
        description: "Weberwall Finecoat is a specially formulated polymer-modified cementitious mortar designed to produce a ultra-smooth, crack-free finish on concrete blocks, brick walls, and coarse cement plasters without requiring primer before painting.",
        applications: [
            "Interior and exterior wall skim coating",
            "Smoothing concrete blockwork and AAC blocks",
            "Leveling uneven plaster surfaces prior to painting"
        ],
        substrates: [
            "AAC blocks and CLC blocks",
            "Concrete panels and columns",
            "Coarse cement-sand plaster"
        ],
        features: [
            "Superior smooth aesthetic finish",
            "High adhesion with zero shrinkage cracks",
            "Eliminates the need for traditional wall putty",
            "High breathability and weather resistance",
            "Reduces paint consumption significantly"
        ],
        specifications: {
            packaging: "40 kg bags",
            appearance: "White or Grey fine powder",
            mixingRatio: "Approx. 10 - 12 liters of water per 40 kg bag",
            potLife: "2 hours",
            applicationThickness: "1.5 mm to 3 mm"
        },
        documents: [
            {
                name: "Weberwall Finecoat Technical Brochure",
                url: "#",
                fileSize: "550 KB"
            }
        ]
    },
    {
        id: "weber-tile-cleaner",
        name: "Weber Tile & Stone Heavy-Duty Cleaner",
        brand: "Weber",
        category: "care",
        categoryName: "Tile & Stone Care",
        image: "assets/images/epoxy_grout.png",
        shortDescription: "Fast-acting formulation for removing grout haze, cement stains, grease, and efflorescence from tiles.",
        description: "Weber Heavy-Duty Tile & Stone Cleaner is a specially blended acidic detergent designed to easily dissolve cement residue, construction dirt, hard water stains, and efflorescence from ceramic, vitrified, and porcelain tile surfaces.",
        applications: [
            "Post-tiling cleanup of cement and grout haze",
            "Removal of hard water stains in bathrooms",
            "Restoration of dirty ceramic and vitrified floor tiles"
        ],
        substrates: [
            "Ceramic and glazed vitrified tiles",
            "Unglazed floor tiles",
            "Acid-resistant natural stones"
        ],
        features: [
            "Quickly breaks down cement and mortar residue",
            "Does not alter tile gloss or color when used as directed",
            "Biodegradable formulation",
            "Concentrated formula - dilutable with water"
        ],
        specifications: {
            packaging: "1 Liter & 5 Liter bottles",
            appearance: "Clear liquid",
            ph: "< 2.0 (Concentrate)",
            shelfLife: "24 months in unopened original packaging"
        },
        documents: [
            {
                name: "Tile Cleaner Material Safety Data Sheet",
                url: "#",
                fileSize: "290 KB"
            }
        ]
    },
    {
        id: "saint-gobain-toughened-glazing",
        name: "Saint-Gobain Architectural Toughened Glazing",
        brand: "Saint-Gobain",
        category: "glazing",
        categoryName: "Application Tools & Glazing",
        image: "assets/images/glazing.png",
        shortDescription: "High-performance tempered safety glass and solar control double glazing systems.",
        description: "Mara Infra Solutions supplies Saint-Gobain engineered architectural glazing systems featuring thermal insulation, acoustic damping, and high structural safety for modern commercial facades, UPVC doors, and structural windows.",
        applications: [
            "Commercial building glass curtain walls",
            "Structural UPVC and Aluminium doors & windows",
            "Frameless glass partitions and shower enclosures"
        ],
        substrates: [
            "Aluminium structural framing",
            "UPVC door and window profiles",
            "Steel support spiders"
        ],
        features: [
            "Up to 5x stronger than standard annealed glass",
            "Solar control coating reduces interior heat buildup",
            "Acoustic laminated layer for sound reduction",
            "Custom thermal toughening and edge processing"
        ],
        specifications: {
            packaging: "Custom engineered crates",
            appearance: "Clear, Tinted, or Solar-Shield Coated",
            glassThickness: "6mm, 8mm, 10mm, 12mm & Double Glazed Units (DGU)"
        },
        documents: [
            {
                name: "Saint-Gobain Architectural Glass Specification Guide",
                url: "#",
                fileSize: "2.1 MB"
            }
        ]
    },
    {
        id: "pu-injection-grout",
        name: "Polyurethane Hydrophobic Injection Grout",
        brand: "Mara Infra Solutions",
        category: "waterproofing",
        categoryName: "Waterproofing",
        image: "assets/images/hero.png",
        shortDescription: "High-pressure single-component PU resin for stopping live water leaks in concrete structures.",
        description: "A fast-reacting hydrophobic polyurethane injection chemical engineered to penetrate deep concrete cracks. Upon contact with water, it expands into a tough, closed-cell flexible foam that permanently seals active water gushers.",
        applications: [
            "Stop active water leaks in basements and retaining walls",
            "Sealing expansion joints and pipe penetrations",
            "Underground tunnels and concrete water tanks"
        ],
        substrates: [
            "Reinforced concrete structures",
            "Stone masonry foundations"
        ],
        features: [
            "Expands up to 30 times original volume on contact with water",
            "Permanently flexible seal that accommodates structural movement",
            "Resists high hydrostatic pressure",
            "Suitable for drinking water contact"
        ],
        specifications: {
            packaging: "10 kg steel drums",
            appearance: "Amber liquid resin",
            expansionRatio: "Up to 3000%",
            reactionTime: "15 to 30 seconds upon water contact"
        },
        documents: [
            {
                name: "PU Injection Grouting Technical Specification",
                url: "#",
                fileSize: "380 KB"
            }
        ]
    }
];

// Product Category Definitions
const categories = [
    {
        id: "adhesives",
        name: "Tile & Stone Adhesives",
        description: "Polymer-modified cementitious adhesives for vitrified tiles, granite, and natural stone.",
        image: "assets/images/weber_tile_adhesive.png"
    },
    {
        id: "grouts",
        name: "Tile & Stone Joint Fillers",
        description: "100% stain-proof epoxy grouts and cementitious joint fillers in custom shades.",
        image: "assets/images/epoxy_grout.png"
    },
    {
        id: "care",
        name: "Tile & Stone Care",
        description: "Heavy-duty cleaners, stone sealers, and surface protection chemicals.",
        image: "assets/images/epoxy_grout.png"
    },
    {
        id: "waterproofing",
        name: "Waterproofing",
        description: "Elastomeric coatings, PU injection grouts, and tank waterproofing membranes.",
        image: "assets/images/waterproofing.png"
    },
    {
        id: "wall-solutions",
        name: "Weberwall Finecoat",
        description: "Polymer skim coat mortars for ultra-smooth, crack-free wall finishes.",
        image: "assets/images/weberwall_finecoat.png"
    },
    {
        id: "glazing",
        name: "Application Tools & Glazing",
        description: "Saint-Gobain architectural glazing, UPVC systems, and professional notched trowels.",
        image: "assets/images/glazing.png"
    },
    {
        id: "add-ons",
        name: "Add-On Chemicals",
        description: "Acrylic primers, mortar admixtures, bonding agents, and joint pastes.",
        image: "assets/images/addon_chem.png"
    }
];

// Construction Solutions Problem-to-Product Mapping
const solutions = [
    {
        id: "tile-installation",
        title: "Installing Tiles & Stone",
        icon: "fa-border-all",
        category: "adhesives",
        description: "Secure, durable bonding solutions for indoor flooring, outdoor facades, and tile-on-tile renovation.",
        recommendedProducts: ["weber-set-polymer", "weber-color-epoxy"]
    },
    {
        id: "waterproofing-solution",
        title: "Waterproofing & Leak Control",
        icon: "fa-droplet-slash",
        category: "waterproofing",
        description: "Complete leak-prevention systems for roofs, basements, swimming pools, and sunken toilets.",
        recommendedProducts: ["weber-dry-protect", "pu-injection-grout"]
    },
    {
        id: "wall-finishing",
        title: "Finishing Walls",
        icon: "fa-brush",
        category: "wall-solutions",
        description: "Ultra-smooth, crack-free skim coating mortars that replace traditional putty and reduce paint consumption.",
        recommendedProducts: ["weberwall-finecoat"]
    },
    {
        id: "tile-care",
        title: "Maintaining Tile & Stone",
        icon: "fa-wand-magic-sparkles",
        category: "care",
        description: "Heavy-duty cleaning formulations that dissolve cement haze and preserve stone luster.",
        recommendedProducts: ["weber-tile-cleaner"]
    },
    {
        id: "architectural-glazing",
        title: "Doors & Glazing Systems",
        icon: "fa-building",
        category: "glazing",
        description: "Saint-Gobain toughened safety glass, UPVC windows, acoustic partitions, and solar control glazing.",
        recommendedProducts: ["saint-gobain-toughened-glazing"]
    }
];

if (typeof window !== 'undefined') {
    window.products = products;
    window.categories = categories;
    window.solutions = solutions;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, categories, solutions };
}
