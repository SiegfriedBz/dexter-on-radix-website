import TopicSection, { DexterButton } from "./components/TopicSection";
import { KeyFeatures } from "./components/KeyFeatures";
import TranslationWrapper from "../components/TranslationWrapper";

export enum Device {
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP",
}

export enum TopicSectionEnum {
  TOKENOMICS = "TOKENOMICS",
  TRADE = "TRADE",
  STAKE = "STAKE",
  CONTRIBUTE = "CONTRIBUTE",
}

// Define a shared variable for container dimensions and padding to ensure
// consistency across sections with full-width backgrounds.
export const containerWidthAndPadding = "w-[1080px] max-w-[100vw] m-auto p-8 ";

export default function Landing() {
  return (
    <div className="bg-dexter-grey-light">
      <HeroSection />
      <TopicSection topic={TopicSectionEnum.TOKENOMICS} />
      <TopicSection topic={TopicSectionEnum.TRADE} />
      <TopicSection topic={TopicSectionEnum.STAKE} />
      <TopicSection topic={TopicSectionEnum.CONTRIBUTE} />
    </div>
  );
}

function HeroSection() {
  return (
    <div
      className={
        `${containerWidthAndPadding} ` +
        `flex flex-col justify-center items-center ` +
        `min-h-[100vh] pb-[20vh]`
      }
    >
      <div className="flex justify-center relative">
        <div
          className={
            `flex flex-col items-start justify-center z-50 ` +
            `max-[820px]:items-center max-[820px]:text-center ` +
            `min-[821px]:max-w-[60%] `
          }
        >
          <img
            src="/dexter-logo-and-lettering.svg"
            alt="dexter logo and lettering"
            className="pb-4 min-[420px]:hidden h-12"
          />
          <h1
            className={
              `!m-0 z-100 ` +
              `max-[420px]:py-4 ` +
              `max-[820px]:max-w-[600px] max-[820px]:!mb-2 `
            }
          >
            <TranslationWrapper label="decentralized_order_book_exchange_on" />
          </h1>
          <div className="relative">
            <BackgroundLights showFor={Device.MOBILE} />
            <DexterButton title="trade_now" targetUrl="/trade" />
          </div>
          <KeyFeatures showFor={Device.MOBILE} />
        </div>
        <div className="relative">
          <BackgroundLights showFor={Device.DESKTOP} />
          <img
            src="/landing/dexter-mascotte.png"
            alt="Dexter Mascotte"
            className={`w-[285px] z-[100] max-[820px]:hidden relative `}
          />
        </div>
      </div>
      <KeyFeatures showFor={Device.DESKTOP} />
    </div>
  );
}

function BackgroundLights({ showFor }: { showFor: Device }) {
  if (showFor === Device.DESKTOP) {
    return (
      // Parent is not rendered on small screens so we don't need to explicitally hide it
      <>
        <img
          src="/landing/blue-light.svg"
          alt="blue light"
          className="absolute opacity-60 z-10 scale-[4] top-[200px] right-[-239px] "
        />
        <img
          src="/landing/green-light.svg"
          alt="green light"
          className="absolute z-10 scale-[4] top-[-147px] right-[122px] "
        />
        <img
          src="/landing/background-structures.png"
          alt="background structures"
          className="absolute opacity-10 z-20 scale-[2.5] top-[0px]"
        />
      </>
    );
  }
  if (showFor === Device.MOBILE) {
    return (
      // Parent is always rendered so we need to explicitally hide it
      <div className="min-[821px]:hidden">
        <img
          src="/landing/blue-light.svg"
          alt="blue light"
          className="absolute opacity-40 scale-[4] top-[-0%] right-[-80%] z-[-30]"
        />
        <img
          src="/landing/green-light.svg"
          alt="green light"
          className="absolute opacity-100 scale-[4] top-[-200%] left-[-50%] z-[-30] "
        />
      </div>
    );
  }
}
