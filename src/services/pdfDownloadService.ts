import apiClient from '@/api';
import authService from '@/services/authService';
import { Browser } from '@capacitor/browser';

// Define interfaces for the download service
export interface DownloadTokenRequest {
  file: string;
}

export interface DownloadTokenResponse {
  token: string;
}

class PdfDownloadService {
  /**
   * Generates a download token for a specific file
   * @param fileUrl URL of the file to download
   * @returns Promise with the download token
   */
  async generateDownloadToken(fileUrl: string): Promise<string> {
    try {
      // Ensure auth header is set
      authService.setAuthHeader();
      
      const request: DownloadTokenRequest = {
        file: fileUrl
      };
      
      const response = await apiClient.post<DownloadTokenResponse>(
        '/api/download/token',
        request
      );
      
      return response.data.token;
    } catch (error) {
      console.error('Error generating download token:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Gets the full download URL for a token
   * @param token The download token
   * @returns The full URL to download the file
   */
  getDownloadUrl(token: string): string {
    return `${apiClient.defaults.baseURL}/api/download/${token}`;
  }

  /**
   * Opens a PDF file in the in-app browser
   * @param fileUrl URL of the file to download
   * @returns Promise that resolves when the in-app browser is opened
   */
  async openPdfInAppBrowser(fileUrl: string): Promise<void> {
    try {
      // Step 1: Generate a download token
      const token = await this.generateDownloadToken(fileUrl);
      
      // Step 2: Open the download URL in the in-app browser
      const downloadUrl = this.getDownloadUrl(token);
      
      await Browser.open({
        url: downloadUrl,
        // presentationStyle: 'fullscreen',
        // toolbarColor: '#3880ff' // Ionic primary color
      });
    } catch (error) {
      console.error('Error opening PDF:', error);
      throw this.handleError(error);
    }
  }
  
  /**
   * @deprecated Use openPdfInAppBrowser instead
   * Downloads and opens a PDF file in the browser
   * @param fileUrl URL of the file to download
   * @returns Promise that resolves when the download is initiated
   */
  async downloadAndOpenPdf(fileUrl: string): Promise<void> {
    return this.openPdfInAppBrowser(fileUrl);
  }

  /**
   * Handles errors from the API
   * @param error The error object
   * @returns A user-friendly error message
   */
  private handleError(error: any): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      
      if (status === 401) {
        return new Error('Authentication required. Please log in again.');
      } else if (status === 403) {
        return new Error('You do not have permission to download this file.');
      } else if (status === 404) {
        return new Error('The requested file could not be found.');
      } else if (status === 410) {
        return new Error('This download link has expired or already been used.');
      } else {
        return new Error(`Server error: ${error.response.data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error(`Error: ${error.message}`);
    }
  }
}

// Export a singleton instance
export default new PdfDownloadService();
