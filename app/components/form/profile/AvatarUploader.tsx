'use client';

import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function AvatarUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload/avatar', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      console.log('Image uploaded at:', data.url);
    }
  };

  return (
    <div className="w-full max-w-xs flex flex-col items-center justify-center gap-4">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed border-white/30 rounded-full bg-black/40 hover:bg-black/60 cursor-pointer transition"
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover rounded-full" />
        ) : (
          <div className="flex flex-col items-center justify-center text-white opacity-60">
            <UploadCloud className="w-6 h-6 mb-1" />
            <span className="text-xs text-center">
              Importer
              <br />
              votre avatar
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
          {uploading ? 'Envoi...' : 'Envoyer'}
        </button>
      )}
    </div>
  );
}
