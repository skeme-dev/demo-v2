import { readonly, writable } from 'svelte/store';

export const screenWidthWriteable = writable(0);

export const screenWidth = readonly(screenWidthWriteable);
