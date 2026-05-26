---
title: Technical Polish — Inter, KaTeX, and Prose Styling
date: 2025-09-19
description: Swapping to Inter for better readability, adding KaTeX support, and refining prose styling.
tags: [website, design, typography]
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mmrbcr4lhp2w"
---

### Typography & Readability
I've swapped the primary UI font to **Inter**. This change improves compatibility with markdown parsing and ensures a cleaner, more professional look across different devices.

### Mathematical Expressions
Integrated **KaTeX** support to allow for high-quality rendering of mathematical expressions within blog posts. This was achieved by importing the KaTeX CSS into the main stylesheet and ensuring the markdown parser correctly handles the syntax.

### Prose Styling
- **Heading Underlines:** Added subtle underlines to headings to improve section separation.
- **Code Blocks:** Enhanced code block styling for better contrast and readability.
- **UK Localization:** Standardized on `en-GB` localization, including "licence" spelling and UK-specific date formatting for OG images.
- **Copyright:** Added a dynamic copyright year range that automatically updates based on the current year.
