import Image from 'next/image';
import background from '@/app/assets/backgrounds/background.png';
import tournoilogo from '@/app/assets/logos/VNoir-CBlanc.png';
import { fontDisplayOutlined } from './fonts';
import AuthForms from '@/app/components/auth/AuthForms';

export default function Home() {
  return (
    <div className="relative min-h-screen grid grid-rows-[20px_1fr_20px] justify-items-center items-center gap-16 px-8 pb-20 sm:px-20">
      <Image
        src={background}
        alt="Background"
        fill
        quality={100}
        className="object-cover z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/15 z-10" />

      <main className="relative z-20 row-start-2 flex flex-col gap-15 items-center sm:items-start text-white text-center sm:text-left mask-cover">
        <h1 className={`text-4xl sm:text-6xl drop-shadow-xl ${fontDisplayOutlined.className}`}>
          Bienvenue au Tournoi !
        </h1>
        <div className={`flex w-full max-w-4xl gap-4 items-center`}>
          <div className="flex w-1/3 justify-center">
            <Image
              alt="Logo du Tournoi"
              src={tournoilogo}
              quality={100}
              className="w-full h-auto max-w-[180px]"
            />
          </div>
          <div className={`flex w-2/3 justify-center`}>
            <AuthForms />
          </div>
        </div>
      </main>

      <footer className="relative z-20 row-start-3 flex flex-wrap gap-6 items-center justify-center text-white text-sm">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
