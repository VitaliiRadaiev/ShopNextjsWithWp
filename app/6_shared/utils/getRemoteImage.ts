
type Image = {
    id: string;
    url: string;
    isMain: boolean;
    productCardId: string;
}

export function getRemoteImage(images: Image[]): string | null {
    const image: Image | null = images.filter(img => img.isMain)[0] || images[0] || null;
    return image ? image.url : null;
}