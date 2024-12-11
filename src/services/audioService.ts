import axios from 'axios';

interface AudioResponse {
  url: string;
  contentType: string;
}

export async function getAudioUrl(driveUrl: string): Promise<AudioResponse> {
  try {
    // Extract file ID from Google Drive URL
    const fileId = driveUrl.match(/[-\w]{25,}/)?.[0];
    if (!fileId) {
      throw new Error('رابط الملف غير صالح');
    }

    // Use the direct streaming URL
    const streamUrl = `https://docs.google.com/uc?export=download&id=${fileId}`;
    
    // Verify file exists and is accessible
    const response = await axios.head(streamUrl);
    
    // Check if we got redirected to the Google Drive UI
    if (response.headers['content-type']?.includes('text/html')) {
      throw new Error('لا يمكن الوصول للملف. يرجى التأكد من صلاحيات المشاركة');
    }

    return {
      url: streamUrl,
      contentType: 'audio/mpeg'
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('الملف غير موجود');
      }
      if (error.response?.status === 403) {
        throw new Error('لا يمكن الوصول للملف. يرجى التأكد من صلاحيات المشاركة');
      }
    }
    console.error('Error getting audio URL:', error);
    throw new Error('فشل في تحميل الملف الصوتي');
  }
}