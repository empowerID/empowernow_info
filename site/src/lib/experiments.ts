export type Variant = 'A' | 'B';

export function getVariant(key: string, seed?: string): Variant {
	try {
		const source = `${key}:${seed || (typeof window !== 'undefined' ? window.location.pathname : '')}`;
		let hash = 0;
		for (let i = 0; i < source.length; i++) hash = (hash * 31 + source.charCodeAt(i)) | 0;
		return (Math.abs(hash) % 2) === 0 ? 'A' : 'B';
	} catch {
		return 'A';
	}
}
