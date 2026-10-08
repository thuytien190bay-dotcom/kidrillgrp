export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  parents?: string[];
  shared?: boolean;
  owners?: Array<{
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  }>;
}

export interface DriveAbout {
  user?: {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  };
  storageQuota?: {
    limit?: string;
    usage?: string;
    usageInDrive?: string;
    usageInDriveTrash?: string;
  };
}

export const listDriveFiles = async (
  accessToken: string,
  options: {
    parentId?: string;
    searchQuery?: string;
    mimeTypeFilter?: string;
    pageSize?: number;
  } = {}
): Promise<{ files: DriveFile[]; nextPageToken?: string }> => {
  const { parentId, searchQuery, mimeTypeFilter, pageSize = 40 } = options;

  const queryParts: string[] = ['trashed = false'];

  if (parentId) {
    queryParts.push(`'${parentId}' in parents`);
  }

  if (searchQuery && searchQuery.trim()) {
    const escaped = searchQuery.trim().replace(/['\\]/g, '');
    queryParts.push(`name contains '${escaped}'`);
  }

  if (mimeTypeFilter && mimeTypeFilter !== 'all') {
    if (mimeTypeFilter === 'folders') {
      queryParts.push(`mimeType = 'application/vnd.google-apps.folder'`);
    } else if (mimeTypeFilter === 'documents') {
      queryParts.push(
        `(mimeType contains 'document' or mimeType contains 'text' or mimeType contains 'pdf' or mimeType = 'application/vnd.google-apps.document')`
      );
    } else if (mimeTypeFilter === 'spreadsheets') {
      queryParts.push(
        `(mimeType contains 'spreadsheet' or mimeType contains 'excel' or mimeType contains 'csv' or mimeType = 'application/vnd.google-apps.spreadsheet')`
      );
    } else if (mimeTypeFilter === 'images') {
      queryParts.push(`mimeType contains 'image/'`);
    }
  }

  const q = queryParts.join(' and ');
  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.set('q', q);
  url.searchParams.set('pageSize', pageSize.toString());
  url.searchParams.set(
    'fields',
    'nextPageToken, files(id, name, mimeType, size, modifiedTime, webViewLink, webContentLink, iconLink, thumbnailLink, parents, shared, owners(displayName, emailAddress, photoLink))'
  );
  url.searchParams.set('orderBy', 'folder,modifiedTime desc');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch Drive files: ${response.statusText}`);
  }

  return response.json();
};

export const getDriveAbout = async (accessToken: string): Promise<DriveAbout> => {
  const response = await fetch(
    'https://www.googleapis.com/drive/v3/about?fields=user,storageQuota',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch Drive about: ${response.statusText}`);
  }

  return response.json();
};

export const createDriveFolder = async (
  accessToken: string,
  folderName: string,
  parentId?: string
): Promise<DriveFile> => {
  const metadata: Record<string, any> = {
    name: folderName.trim(),
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const response = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create folder: ${response.statusText}`);
  }

  return response.json();
};

export const uploadDriveFile = async (
  accessToken: string,
  file: File,
  parentId?: string
): Promise<DriveFile> => {
  const metadata: Record<string, any> = {
    name: file.name,
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileArrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
    metadata
  )}`;
  const mediaPartHeader = `${delimiter}Content-Type: ${
    file.type || 'application/octet-stream'
  }\r\n\r\n`;

  const encoder = new TextEncoder();
  const metadataBuffer = encoder.encode(metadataPart);
  const mediaHeaderBuffer = encoder.encode(mediaPartHeader);
  const closeDelimiterBuffer = encoder.encode(closeDelimiter);

  // Combine into single Uint8Array
  const combinedBuffer = new Uint8Array(
    metadataBuffer.byteLength +
      mediaHeaderBuffer.byteLength +
      fileArrayBuffer.byteLength +
      closeDelimiterBuffer.byteLength
  );

  let offset = 0;
  combinedBuffer.set(metadataBuffer, offset);
  offset += metadataBuffer.byteLength;
  combinedBuffer.set(mediaHeaderBuffer, offset);
  offset += mediaHeaderBuffer.byteLength;
  combinedBuffer.set(new Uint8Array(fileArrayBuffer), offset);
  offset += fileArrayBuffer.byteLength;
  combinedBuffer.set(closeDelimiterBuffer, offset);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: combinedBuffer,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to upload file: ${response.statusText}`);
  }

  return response.json();
};

export const deleteDriveFile = async (
  accessToken: string,
  fileId: string
): Promise<void> => {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to delete file: ${response.statusText}`);
  }
};

export const formatFileSize = (bytes?: string | number): string => {
  if (!bytes) return '--';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(num) / Math.log(k));
  return `${parseFloat((num / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const isFolder = (mimeType: string): boolean => {
  return mimeType === 'application/vnd.google-apps.folder';
};
