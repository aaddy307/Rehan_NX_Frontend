import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  search: '',
  category: '',
  brand: '',
  sort: 'newest',
  page: 1,

  setFilter: (key, value) => set({ [key]: value, page: 1 }),

  resetFilters: () =>
    set({
      search: '',
      category: '',
      brand: '',
      sort: 'newest',
      page: 1,
    }),
}))