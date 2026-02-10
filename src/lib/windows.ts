import type { WindowType } from '@/types/config';

type ComponentLoader = () => Promise<{ default: unknown }>;

export const windowComponents: Record<WindowType, ComponentLoader> = {
  terminal: () => import('@/windows/Terminal.astro'),
  browser: () => import('@/windows/Browser.astro'),
  editor: () => import('@/windows/Editor.astro'),
  'file-manager': () => import('@/windows/FileManager.astro'),
  'system-monitor': () => import('@/windows/SystemMonitor.astro'),
  'pdf-viewer': () => import('@/windows/PDFViewer.astro'),
  'image-viewer': () => import('@/windows/ImageViewer.astro'),
  'markdown-viewer': () => import('@/windows/MarkdownViewer.astro'),
  blank: () => import('@/windows/Blank.astro'),
};

export function getWindowComponent(type: WindowType): ComponentLoader {
  return windowComponents[type];
}
