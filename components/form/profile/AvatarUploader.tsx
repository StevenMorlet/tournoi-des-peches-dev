'use client';

import React, { useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { fontGameCompact } from '@/lib/fonts';
import { useNotify } from '@/contexts/NotificationContext';
import { useTranslations } from 'next-intl';

interface AvatarUploaderProps {
  avatarUrl?: string | null;
  onUploadAction: (newUrl: string) => void;
  onReset?: () => void;
}

export default function AvatarUploader({
  avatarUrl,
  onUploadAction,
  onReset,
}: AvatarUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const notify = useNotify();
  const g = useTranslations('General');
  const t = useTranslations('AvatarUploader');

  useEffect(() => {
    if (!file) setPreview(null);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (selected) {
      if (!selected.type.startsWith('image/')) {
        notify(t('onlyImageFiles'), 'warning');
        e.target.value = '';
        return;
      }

      if (selected.size > 2 * 1024 * 1024) {
        notify(t('imageTooHeavy'), 'warning');
        e.target.value = '';
        return;
      }

      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/profile/upload-avatar', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUploading(false);
    if (res.ok && data.avatarUrl) {
      onUploadAction(data.avatarUrl);
      setFile(null);
    }
  };

  return (
    <div
      className={`w-full max-w-xs flex flex-col items-center justify-center gap-4 ${fontGameCompact.className}`}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-36 h-36 border-4 border-dashed border-border/40 rounded-full bg-black/40 hover:bg-black/60 cursor-pointer transition"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-full"
            width={144}
            height={144}
          />
        ) : avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
            width={144}
            height={144}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white opacity-60">
            <UploadCloud className="w-6 h-6 mb-1" />
            <span className="text-xs text-center">
              {g('import')} <br /> {t('yourAvatar')}
            </span>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <button
          onClick={handleUpload}
          className="text-sm px-4 py-1 rounded-lg bg-primary hover:bg-secondary text-white transition"
          disabled={uploading}
        >
          {uploading ? g('sending') : g('send')}
        </button>
      )}

      {avatarUrl && onReset && !file && (
        <button onClick={onReset} className="text-sm text-primary hover:text-secondary">
          {g('reinitialize')} {t('yourAvatar')}
        </button>
      )}
    </div>
  );
}
