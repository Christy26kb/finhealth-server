export enum HealthChecks {
  PRISMA_SUPABASE = 'prsima-supabase',
  STORAGE_DISK = 'storage-disk',
  MEMORY_HEAP = 'memory-heap',
}

type DiskStorageType = {
  path: string;
  threshold: number;
};

export const DiskOptions: DiskStorageType = {
  path: '/',
  threshold: 250 * 1024 * 1024 * 1024, // Update with proper threshold
};

export const MemoryThreshold = 150 * 1024 * 1024;
