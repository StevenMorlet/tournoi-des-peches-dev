import Image from 'next/image';
import background from '@/app/assets/background.png';
import {
  fontArcadeOutlined,
  fontArcadeBlock,
  fontArcadeBlockOutlined,
  fontArcadeBlockFilledOutline,
  fontArcadeFilledOutline,
  fontArcade,
  fontDigital,
  fontDigitalOutlined,
  fontDigitalFilledOutline,
  fontDisplay,
  fontDisplayOutlined,
  fontDisplayFilledOutline,
  fontGameCompact,
  fontGame,
  fontGameFilledOutline,
  fontGameOutlined,
} from '../fonts';

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

      <main className="relative z-20 row-start-2 flex flex-col gap-8 items-center sm:items-start text-white text-center sm:text-left">
        <div className="grid grid-cols-2 gap-20 gap-y-25">
          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit box-shadow-md">
              fontArcadeOutlined / fontArcade / fontArcadeFilledOutline
            </div>
            <h1 className={`text-4xl sm:text-6xl drop-shadow-xl ${fontArcadeOutlined.className}`}>
              Bienvenue au Tournoi !
            </h1>
            <p className={`text-2xl text-justify ${fontArcade.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`text-2xl text-justify ${fontArcadeFilledOutline.className}`}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit box-shadow-md">
              fontArcadeBlockOutlined / fontArcadeBlock / fontArcadeBlockFilledOutline
            </div>
            <h1
              className={`text-4xl sm:text-6xl drop-shadow-xl ${fontArcadeBlockOutlined.className}`}
            >
              Bienvenue au Tournoi !
            </h1>
            <p className={`text-2xl text-justify ${fontArcadeBlock.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`text-2xl text-justify ${fontArcadeBlockFilledOutline.className}`}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit box-shadow-md">
              fontDigitalOutlined / fontDigital / fontDigitalFilledOutline
            </div>
            <h1 className={`text-4xl sm:text-6xl drop-shadow-xl ${fontDigitalOutlined.className}`}>
              Bienvenue au Tournoi !
            </h1>
            <p className={`text-2xl text-justify ${fontDigital.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`text-2xl text-justify ${fontDigitalFilledOutline.className}`}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit">
              fontDisplayOutlined / fontDisplay / fontDisplayFilledOutline
            </div>
            <h1 className={`text-4xl sm:text-6xl drop-shadow-xl ${fontDisplayOutlined.className}`}>
              Bienvenue au Tournoi !
            </h1>
            <p className={`text-2xl text-justify ${fontDisplay.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`text-2xl text-justify ${fontDisplayFilledOutline.className}`}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit">
              fontGameOutlined / fontGame / fontGameFilledOutline
            </div>
            <h1 className={`text-4xl sm:text-6xl drop-shadow-xl ${fontGameOutlined.className}`}>
              Bienvenue au Tournoi !
            </h1>
            <p className={`text-2xl text-justify ${fontGame.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`text-2xl text-justify ${fontGameFilledOutline.className}`}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit">
              fontGameCompact
            </div>
            <h1 className={`text-4xl sm:text-6xl drop-shadow-xl ${fontGameCompact.className}`}>
              Bienvenue au Tournoi !
            </h1>
            <p className={`text-2xl text-justify ${fontGameCompact.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`text-2xl text-justify ${fontGameCompact.className}`}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
