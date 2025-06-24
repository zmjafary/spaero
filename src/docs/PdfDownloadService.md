# PDF Viewer Service Documentation

This documentation explains how to use the PDF viewer service and components to handle secure PDF file viewing in your Ionic application.

## Overview

The PDF viewer system consists of:

1. **PdfDownloadService**: A service that handles API communication for secure PDF viewing
2. **PdfDownloader**: A reusable Vue component that provides a button UI for viewing PDFs
3. **PdfDownloadExample**: An example component showing different ways to use the PDF viewer

The implementation follows a secure token-based approach:
1. The service first requests a one-time download token from the authenticated API
2. Once the token is received, it redirects to the public download URL with the token
3. The PDF is opened in an in-app browser, providing a seamless user experience

## API Endpoints

The service works with two API endpoints:

### 1. Generate Download Token (Authenticated)

```
Endpoint: POST /api/download/token
Headers: 
- Authorization: Bearer {your_auth_token}
- Content-Type: application/json
Request Body:
{
    "file": "string" // URL of the file to view
}
Response:
{
    "token": "string" // 64-character token
}
```

### 2. Download File (Public)

```
Endpoint: GET /api/download/{token}
Response: PDF file stream (application/pdf)
```

## Using the PdfDownloadService

You can use the service directly in your components:

```typescript
import pdfDownloadService from '@/services/pdfDownloadService';

// In your component method
async function viewDocument(fileUrl: string) {
  try {
    await pdfDownloadService.openPdfInAppBrowser(fileUrl);
    console.log('PDF opened in in-app browser');
  } catch (error) {
    console.error('Failed to open PDF:', error);
    // Handle error
  }
}
```

## Using the PdfDownloader Component

The `PdfDownloader` component provides a ready-to-use button for viewing PDFs:

```vue
<template>
  <pdf-downloader
    file-url="https://api.example.com/documents/report.pdf"
    button-text="View Report"
    icon="document-outline"
    button-color="primary"
    @view-started="onViewStarted"
    @view-complete="onViewComplete"
    @view-error="onViewError"
  ></pdf-downloader>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PdfDownloader from '@/components/PdfDownloader.vue';

export default defineComponent({
  components: {
    PdfDownloader
  },
  setup() {
    const onViewStarted = () => {
      console.log('PDF viewer started');
    };
    
    const onViewComplete = () => {
      console.log('PDF opened in browser');
    };
    
    const onViewError = (error: string) => {
      console.error('PDF viewer error:', error);
    };
    
    return {
      onViewStarted,
      onViewComplete,
      onViewError
    };
  }
});
</script>
```

## PdfDownloader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fileUrl | string | (required) | URL of the PDF file to view |
| buttonText | string | 'View PDF' | Text to display on the button |
| icon | string | 'document-outline' | Ionicons icon name |
| buttonColor | string | 'primary' | Ionic color for the button |
| size | 'default' \| 'small' \| 'large' | 'default' | Button size |
| expand | 'block' \| 'full' | 'block' | Button expand property |
| fill | 'default' \| 'solid' \| 'clear' \| 'outline' | 'solid' | Button fill property |

## PdfDownloader Events

| Event | Payload | Description |
|-------|---------|-------------|
| view-started | none | Emitted when the PDF viewing process starts |
| view-complete | none | Emitted when the PDF is successfully opened in the in-app browser |
| view-error | string | Emitted when an error occurs, with the error message |

## Error Handling

The service handles various error scenarios:

- 401: Authentication required
- 403: Permission denied
- 404: File not found
- 410: Token expired or already used
- Network errors
- Other server errors

## Example Use Cases

1. **Order Invoices**: Allow users to view invoice PDFs from their order history
2. **Product Manuals**: Provide secure access to product documentation
3. **Reports**: Generate and view custom reports
4. **Certificates**: View quality certificates or compliance documents

See the `PdfDownloadExample.vue` component for implementation examples of these use cases.

## Integration with Existing Code

To integrate with an existing component:

1. Import the service or component:
   ```typescript
   import pdfDownloadService from '@/services/pdfDownloadService';
   // or
   import PdfDownloader from '@/components/PdfDownloader.vue';
   ```

2. Add the component to your template (if using the component):
   ```vue
   <pdf-downloader
     file-url="your-file-url"
     button-text="View PDF"
   ></pdf-downloader>
   ```

3. Or call the service directly (if using the service):
   ```typescript
   pdfDownloadService.openPdfInAppBrowser('your-file-url');
   ```

## Security Considerations

- Each token can only be used once and is deleted after use
- The service automatically adds the authentication token from the auth service
- The download URL is public but requires a valid token
- The token is generated server-side and tied to the authenticated user
- The PDF is opened in an in-app browser, which provides a more controlled environment

## Technical Implementation

This service uses the Capacitor Browser plugin to open PDFs in an in-app browser. The plugin provides a native in-app browser experience on both iOS and Android, while falling back to a web browser tab on web platforms.

### Dependencies

- @capacitor/browser: For opening PDFs in an in-app browser

### Configuration

The in-app browser is configured with the following options:
- presentationStyle: 'fullscreen' - Opens the browser in fullscreen mode
- toolbarColor: '#3880ff' - Sets the toolbar color to Ionic's primary color
