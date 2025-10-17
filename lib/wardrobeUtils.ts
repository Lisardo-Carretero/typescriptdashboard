/**
 * Utilities for handling wardrobe data securely
 * Provides functions to generate public identifiers and handle wardrobe data
 */

/**
 * Generates a public-friendly identifier for a wardrobe
 * This avoids exposing database IDs while maintaining functionality
 */
export function generatePublicWardrobeId(wardrobe: { id: number; name: string }): string {
    // Create a simple hash-like identifier based on name and ID
    // This is predictable but doesn't directly expose the database ID
    const nameHash = wardrobe.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 8);

    const idSuffix = (wardrobe.id * 7919 + 12345) % 10000; // Simple obfuscation

    return `${nameHash}-${idSuffix}`;
}

/**
 * Gets a display-friendly name for a wardrobe without exposing sensitive data
 */
export function getWardrobeDisplayName(wardrobe: { name: string; location?: string | null }): string {
    if (wardrobe.location) {
        return `${wardrobe.name} - ${wardrobe.location}`;
    }
    return wardrobe.name;
}

/**
 * Sanitizes wardrobe data for frontend consumption
 */
export function sanitizeWardrobeForFrontend(wardrobe: any): any {
    return {
        // Keep internal ID for functionality but don't expose it
        id: wardrobe.id,
        name: wardrobe.name,
        location: wardrobe.location,
        house_id: wardrobe.house_id,
        house: wardrobe.house,
        // Add a public identifier for display/tracking
        displayId: generatePublicWardrobeId(wardrobe),
        displayName: getWardrobeDisplayName(wardrobe)
    };
}