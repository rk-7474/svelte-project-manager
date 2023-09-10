import { writable } from 'svelte/store';

export const canEdit = writable(true);
export const currentId = writable(3);

export const statusList = writable([]);
