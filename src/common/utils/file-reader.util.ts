import { promises as fs } from 'fs';
import { join } from 'path';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class FileReaderUtil {
  private readonly logger = new Logger(FileReaderUtil.name);
  private cache = new Map<string, any>();

  /**
   * Read and parse a JSON file
   * @param filePath - Relative path from project root
   * @param useCache - Whether to use cached version
   */
  async readJsonFile<T = any>(filePath: string, useCache = true): Promise<T> {
    const absolutePath = join(process.cwd(), filePath);

    // Check cache first
    if (useCache && this.cache.has(absolutePath)) {
      return this.cache.get(absolutePath);
    }

    try {
      const fileContent = await fs.readFile(absolutePath, 'utf-8');
      const parsedData = JSON.parse(fileContent);

      // Store in cache
      if (useCache) {
        this.cache.set(absolutePath, parsedData);
      }

      return parsedData;
    } catch (error) {
      this.logger.error(`Failed to read file: ${absolutePath}`, error);
      throw new NotFoundException(`File not found: ${filePath}`);
    }
  }

  /**
   * Read multiple JSON files
   */
  async readMultipleJsonFiles<T = any>(
    filePaths: string[],
    useCache = true,
  ): Promise<T[]> {
    return Promise.all(
      filePaths.map((path) => this.readJsonFile<T>(path, useCache)),
    );
  }

  /**
   * Clear file cache
   */
  clearCache(filePath?: string) {
    if (filePath) {
      const absolutePath = join(process.cwd(), filePath);
      this.cache.delete(absolutePath);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath: string): Promise<boolean> {
    const absolutePath = join(process.cwd(), filePath);
    try {
      await fs.access(absolutePath);
      return true;
    } catch {
      return false;
    }
  }
}
