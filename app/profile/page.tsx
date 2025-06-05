'use client';

import { useSession } from '@/app/contexts/SessionContext';
import Image from 'next/image';
import React, { useState } from 'react';
import { useNotify } from '@/app/contexts/NotificationContext';
import { fontDisplay } from '@/app/lib/fonts';

export default function ProfilePage() {
  const { user, updateUser } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const notify = useNotify();

  const initials = user?.username
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

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

    if (res.ok && data.avatarUrl) {
      updateUser({ avatarUrl: data.avatarUrl });
      notify('Avatar mis à jour.', 'success');
      setPreview(null);
      setSelectedFile(null);
    } else {
      notify('Erreur lors de la mise à jour.', 'error');
    }
  };

  const handleResetAvatar = async () => {
    const res = await fetch('/api/profile/reset-avatar', {
      method: 'POST',
    });

    if (res.ok) {
      updateUser({ avatarUrl: null });
      notify('Avatar réinitialisé.', 'success');
    } else {
      notify('Erreur lors de la suppression.', 'error');
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="flex flex-1 items-center justify-center  text-white">
      <div className="flex flex-1 flex-col p-8 max-w-md border border-white/20 rounded-xl bg-white/5 shadow-xl">
        <h1 className="text-3xl mb-6">Profil ({user.username})</h1>
        {(user.avatarUrl && (
          <Image
            src={user.avatarUrl ?? '/avatar-placeholder.png'}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-white object-cover w-36 h-36"
          />
        )) || (
          <div
            className={`flex items-center justify-center w-36 h-36 rounded-full bg-neutral-700 border-4 border-white font-semibold text-[450%] ${fontDisplay.className}`}
          >
            {initials}
          </div>
        )}

        <div className="mt-6">
          <input type="file" accept="image/*" onChange={handleChange} />
          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="Preview"
                width={100}
                height={100}
                className="rounded-full border-4 border-white object-cover w-36 h-36"
              />
            </div>
          )}
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
          >
            Upload
          </button>

          {user.avatarUrl && (
            <>
              <button
                onClick={handleResetAvatar}
                className="mt-2 text-sm text-red-400 hover:underline"
              >
                Supprimer l’image de profil
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
