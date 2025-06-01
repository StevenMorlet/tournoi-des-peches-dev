import Image from 'next/image';
import VBlancCBlanc from '@/app/assets/logos/VBlancCBlanc.png';
import VBlancCNoir from '@/app/assets/logos/VBlancCNoir.png';
import VNoirCBlanc from '@/app/assets/logos/VNoirCBlanc.png';
import VNoirCNoir from '@/app/assets/logos/VNoirCNoir.png';
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
} from '../lib/fonts';

export default function Page() {
  return (
    <div className="justify-items-center gap-16 px-20 pb-20">
      <div className="flex flex-col gap-8 text-white">
        <div className="flex flex-row justify-center gap-20 p-20">
          <Image src={VBlancCBlanc} alt="VBCB" quality={100} style={{ width: '15%' }} />
          <Image src={VBlancCNoir} alt="VBCN" quality={100} style={{ width: '15%' }} />
          <Image src={VNoirCBlanc} alt="VNCB" quality={100} style={{ width: '15%' }} />
          <Image src={VNoirCNoir} alt="VNCN" quality={100} style={{ width: '15%' }} />
        </div>
        <div className="grid grid-cols-2 gap-20 gap-y-25">
          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit box-shadow-md">
              fontArcadeOutlined / fontArcade / fontArcadeFilledOutline
            </div>
            <h1 className={`text-5xl drop-shadow-xl ${fontArcadeOutlined.className}`}>
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
            <h1 className={`text-5xl drop-shadow-xl ${fontArcadeBlockOutlined.className}`}>
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
            <h1 className={`text-5xl drop-shadow-xl ${fontDigitalOutlined.className}`}>
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
            <h1 className={`text-5xl drop-shadow-xl ${fontDisplayOutlined.className}`}>
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
            <h1 className={`text-5xl drop-shadow-xl ${fontGameOutlined.className}`}>
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
            <h1 className={`text-5xl drop-shadow-xl ${fontGameCompact.className}`}>
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
      </div>
    </div>
  );
}
