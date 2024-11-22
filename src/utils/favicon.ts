import axios from 'axios';

export async function updateFaviconFromGithub(avatarUrl: string) {
  try {
    // 下载头像
    const response = await axios.get(avatarUrl, {
      responseType: 'blob'
    });
    
    // 创建 Blob URL
    const blob = new Blob([response.data], { type: 'image/png' });
    const blobUrl = URL.createObjectURL(blob);
    
    // 更新网站图标
    const linkElement = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    linkElement.type = 'image/x-icon';
    linkElement.rel = 'icon';
    linkElement.href = blobUrl;
    
    // 如果是新创建的元素，添加到 head 中
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(linkElement);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to update favicon:', error);
    return false;
  }
}
