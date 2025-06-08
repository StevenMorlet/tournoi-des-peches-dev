'use client';

import { useSession } from '@/contexts/SessionContext';
import { useNotify } from '@/contexts/NotificationContext';
import { fontDisplay, fontDisplayOutlined } from '@/lib/fonts';
import AvatarUploader from '@/components/form/profile/AvatarUploader';
import React, { useState } from 'react';
import ChangePasswordModal from '@/components/form/profile/ChangePasswordModal';
import ProfileEditableInputs from '@/components/form/profile/ProfileEditableInputs';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const { user, updateUser, logout } = useSession();
  const notify = useNotify();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const t = useTranslations('ProfilePage');
  const g = useTranslations('General');

  const handleLogout = async () => {
    await logout();
    window.location.href = '/auth';
  };

  const handleResetAvatar = async () => {
    const res = await fetch('/api/profile/reset-avatar', { method: 'POST' });
    if (res.ok) {
      updateUser({ avatarUrl: null });
      notify(t('avatarReinitialized'), 'success');
    } else {
      notify(g('deleteError'), 'error');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm(t('avatarDeleteConfirmation'));
    if (!confirmed) return;
    const res = await fetch('/api/profile/delete-account', { method: 'POST' });
    if (res.ok) {
      notify(t('accountDeleted'), 'success');
      await logout();
      window.location.href = '/auth';
    } else {
      notify(g('deleteError'), 'error');
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-1 items-center justify-center text-white">
      <div className="flex flex-col p-8 max-w-md w-full border-4 border-white/20 rounded-xl bg-white/5 shadow-xl gap-6">
        <h1 className={`text-3xl ${fontDisplayOutlined.className}`}>{g('profile')}</h1>

        <div className="flex justify-center">
          <AvatarUploader
            avatarUrl={user.avatarUrl}
            onUploadAction={(url) => {
              updateUser({ avatarUrl: url });
              notify(t('avatarUpdated'), 'success');
            }}
            onReset={handleResetAvatar}
          />
        </div>

        <div className="flex flex-col gap-4">
          <ProfileEditableInputs />
        </div>

        <hr className="border-white/20 my-1" />

        <div className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => setShowPasswordModal(true)}
            className={`px-4 py-2 bg-ternary hover:bg-secondary text-white rounded ${fontDisplay.className}`}
          >
            {g('changePassword')}
          </button>

          <button
            onClick={handleLogout}
            className={`px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded ${fontDisplay.className}`}
          >
            {g('disconnection')}
          </button>

          <button
            onClick={handleDeleteAccount}
            className={`px-4 py-2 bg-secondary hover:bg-ternary text-white rounded ${fontDisplay.className}`}
          >
            {g('deleteAccount')}
          </button>
        </div>
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onCloseAction={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
