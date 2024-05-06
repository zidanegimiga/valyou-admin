import { ref } from 'vue';

export function useFileUploader() {
  const onRemoveFile = (file, removeFileCallback, index, totalSize, totalSizePercent, setStyle) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
    setStyle([]);
  };

  const onClearFiles = (clear, totalSize, totalSizePercent, setStyle) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
    setStyle([]);
  };

  const onSelectFiles = (event, totalSize, formatSize) => {
    const files = event.files;
    files.forEach((file) => {
      totalSize.value += parseInt(formatSize(file.size));
    });
  };

  const onUpload = (callback, totalSize, totalSizePercent) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
  };

  const formatSize = (bytes) => {
    if (bytes === 0) {
      return '0 B';
    }

    const k = 1000;
    const dm = 3;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const setStyle = (value = []) => {
    const element = document.querySelector('.upload_file__custom .p-fileupload-content');

    if (element) {
      if (!value.length) {
        element.classList.add('file_absolute');
      } else {
        element.classList.remove('file_absolute');
      }
    }
  };

  return {
    onRemoveFile,
    onClearFiles,
    onSelectFiles,
    onUpload,
    formatSize,
    setStyle,
  };
}