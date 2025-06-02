'use client';

import { useSession } from '@/app/contexts/SessionContext';
import Image from 'next/image';
import React, { useState } from 'react';

export default function ProfilePage() {
  const { user } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    const res = await fetch('/api/profile/upload-avatar', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log('Uploaded:', data);
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="flex flex-1 items-center justify-center  text-white">
      <div className="flex flex-1 flex-col p-8 max-w-md border border-white/20 rounded-xl bg-white/5 shadow-xl">
        <h1 className="text-3xl mb-6">Profil de {user.username}</h1>
        <Image
          src={user.avatarUrl ?? '/avatar-placeholder.png'}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <p>Email : {user.email}</p>

        <div className="mt-6">
          <input type="file" accept="image/*" onChange={handleChange} />
          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="Preview"
                width={100}
                height={100}
                className="rounded mx-auto"
              />
            </div>
          )}
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
