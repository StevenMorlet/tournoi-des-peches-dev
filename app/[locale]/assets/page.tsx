import Image from 'next/image';
import VBlancCBlanc from '@/public/assets/logos/VBlancCBlanc.png';
import VBlancCNoir from '@/public/assets/logos/VBlancCNoir.png';
import VNoirCBlanc from '@/public/assets/logos/VNoirCBlanc.png';
import VNoirCNoir from '@/public/assets/logos/VNoirCNoir.png';
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
} from '@/lib/fonts';
import { useTranslations } from 'next-intl';
import { getMessages } from '@/lib/i18n/messages';
import { createTranslator } from 'next-intl';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = createTranslator({ locale: locale, messages });

  return {
    title: t('Metadata.assetsTitle'),
    description: t('Metadata.assetsDescription'),
  };
}

export default function Page() {
  const g = useTranslations('General');
  return (
    <div className="justify-items-center gap-16 px-10 md:px-20 pb-10 md:pb-20">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 justify-items-center md:flex md:flex-row md:justify-center md:gap-20">
          <Image src={VBlancCBlanc} alt="VBCB" quality={100} width={100} height={100} />
          <Image src={VBlancCNoir} alt="VBCN" quality={100} width={100} height={100} />
          <Image src={VNoirCBlanc} alt="VNCB" quality={100} width={100} height={100} />
          <Image src={VNoirCNoir} alt="VNCN" quality={100} width={100} height={100} />
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-20 gap-y-25">
          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit box-shadow-md">
              fontArcadeOutlined / fontArcade / fontArcadeFilledOutline
            </div>
            <h1
              className={`text-xl sm:text-2xl md:text-4xl drop-shadow-xl ${fontArcadeOutlined.className}`}
            >
              {g('welcomeToTheTournament')}
            </h1>
            <p className={`text-md sm:text-lg md:text-2xl text-justify ${fontArcade.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontArcadeFilledOutline.className}`}
            >
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
              className={`text-xl sm:text-2xl md:text-4xl drop-shadow-xl ${fontArcadeBlockOutlined.className}`}
            >
              {g('welcomeToTheTournament')}
            </h1>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontArcadeBlock.className}`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontArcadeBlockFilledOutline.className}`}
            >
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit box-shadow-md">
              fontDigitalOutlined / fontDigital / fontDigitalFilledOutline
            </div>
            <h1
              className={`text-xl sm:text-2xl md:text-4xl drop-shadow-xl ${fontDigitalOutlined.className}`}
            >
              {g('welcomeToTheTournament')}
            </h1>
            <p className={`text-md sm:text-lg md:text-2xl text-justify ${fontDigital.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontDigitalFilledOutline.className}`}
            >
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit">
              fontDisplayOutlined / fontDisplay / fontDisplayFilledOutline
            </div>
            <h1
              className={`text-xl sm:text-2xl md:text-4xl drop-shadow-xl ${fontDisplayOutlined.className}`}
            >
              {g('welcomeToTheTournament')}
            </h1>
            <p className={`text-md sm:text-lg md:text-2xl text-justify ${fontDisplay.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontDisplayFilledOutline.className}`}
            >
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit">
              fontGameOutlined / fontGame / fontGameFilledOutline
            </div>
            <h1
              className={`text-xl sm:text-2xl md:text-4xl drop-shadow-xl ${fontGameOutlined.className}`}
            >
              {g('welcomeToTheTournament')}
            </h1>
            <p className={`text-md sm:text-lg md:text-2xl text-justify ${fontGame.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontGameFilledOutline.className}`}
            >
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="bg-gray-400/30 rounded-xl font-bold p-2 w-fit h-fit">
              fontGameCompact
            </div>
            <h1
              className={`text-xl sm:text-2xl md:text-4xl drop-shadow-xl ${fontGameCompact.className}`}
            >
              {g('welcomeToTheTournament')}
            </h1>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontGameCompact.className}`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p
              className={`text-md sm:text-lg md:text-2xl text-justify ${fontGameCompact.className}`}
            >
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
