import { Preferences } from '@capacitor/preferences';

/**
 * SecureStorageService provides a more secure way to store sensitive data
 * using Capacitor's Preferences plugin, which uses platform-specific
 * secure storage mechanisms on mobile devices.
 */
class SecureStorageService {
  /**
   * Store a value securely
   * @param key The key to store the value under
   * @param value The value to store (will be JSON stringified)
   */
  async set(key: string, value: any): Promise<void> {
    try {
      await Preferences.set({
        key,
        value: typeof value === 'string' ? value : JSON.stringify(value),
      });
    } catch (error) {
      console.error('Error storing data securely:', error);
      // Fallback to localStorage if Preferences fails
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  }

  /**
   * Retrieve a value from secure storage
   * @param key The key to retrieve
   * @returns The stored value, or null if not found
   */
  async get(key: string): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key });
      return value;
    } catch (error) {
      console.error('Error retrieving data from secure storage:', error);
      // Fallback to localStorage if Preferences fails
      return localStorage.getItem(key);
    }
  }

  /**
   * Retrieve and parse a JSON value from secure storage
   * @param key The key to retrieve
   * @returns The parsed value, or null if not found
   */
  async getObject<T>(key: string): Promise<T | null> {
    const value = await this.get(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error('Error parsing JSON from secure storage:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Remove a value from secure storage
   * @param key The key to remove
   */
  async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error('Error removing data from secure storage:', error);
      // Fallback to localStorage if Preferences fails
      localStorage.removeItem(key);
    }
  }

  /**
   * Clear all values from secure storage
   */
  async clear(): Promise<void> {
    try {
      await Preferences.clear();
    } catch (error) {
      console.error('Error clearing secure storage:', error);
      // Fallback to localStorage if Preferences fails
      localStorage.clear();
    }
  }
}

// Export a singleton instance
export default new SecureStorageService();
