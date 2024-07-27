"use client";

import { useHydrationErrorFix, useTranslations } from "hooks";
import { containerWidthAndPadding, TopicSectionEnum } from "../page";

interface IconTitleAndBodyProps {
  icon: string;
  title: string;
  body: string;
}

interface DexterButtonProps {
  title: string;
  targetUrl?: string;
  targetBlank?: boolean;
}

interface DexterHeadingProps {
  title: string;
}

interface DexterParagraphProps {
  text: string;
  additionalClass?: string;
}

interface TopicSectionProps {
  backgroundColor: string;
  title: string;
  body?: JSX.Element;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  reversed: boolean;
}

export function TopicSection({
  topic,
}: {
  topic: TopicSectionEnum;
}): JSX.Element {
  const t = useTranslations();
  const props: TopicSectionProps = getTopicsSectionProps(topic, t);

  const {
    backgroundColor,
    title,
    body,
    imageUrl,
    buttonUrl,
    buttonText,
    reversed,
  } = props;

  const isClient = useHydrationErrorFix();
  if (!isClient) return <></>;

  return (
    <div
      className={`${backgroundColor} py-20 max-[820px]:py-10 z-[100] relative`}
    >
      <div className={`${containerWidthAndPadding} max-[820px]:w-full`}>
        <div
          className={`flex items-center justify-center ${
            reversed ? "flex-row-reverse" : ""
          } max-[820px]:flex-col-reverse max-[820px]:max-w-[480px] m-auto`}
        >
          <div className="w-full min-[821px]:max-w-[520px] max-[820px]:text-center">
            <DexterHeading title={title} />
            {body}
            <DexterButton
              title={buttonText}
              targetUrl={buttonUrl}
              targetBlank={true}
            />
          </div>
          <img
            src={imageUrl}
            alt={title}
            className="w-[400px] min-[821px]:px-8 max-[820px]:max-w-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export default TopicSection;

function IconTitleAndBody({ icon, title, body }: IconTitleAndBodyProps) {
  const t = useTranslations();
  return (
    <div className="flex items-start mt-2">
      <img
        src={`/landing/icons/${icon}.svg`}
        alt={icon}
        className="w-12 mr-4 pt-2 max-[440px]:w-10 max-[440px]:mr-2 max-[440px]:pt-1"
      />
      <div>
        <p className="text-base font-bold text-white text-left">{t(title)}</p>
        <DexterParagraph
          additionalClass="text-left opacity-80"
          text={t(body)}
        />
      </div>
    </div>
  );
}

export function DexterButton({
  title,
  targetUrl,
  targetBlank,
}: DexterButtonProps) {
  const t = useTranslations();

  const translatedTitle = t(title);
  return (
    <a
      href={targetUrl}
      className="z-100 min-w-[220px] max-w-[220px]"
      target={`${targetBlank ? "_blank" : ""}`}
    >
      <button
        className={
          `min-h-[44px] w-[220px] px-4 my-6 mt-8 rounded ` +
          `bg-dexter-green-OG text-black uppercase ` +
          `opacity-100 cursor-pointer `
        }
      >
        <span className="font-bold text-sm tracking-[.1px] ">
          {translatedTitle}
        </span>
      </button>
    </a>
  );
}

function DexterHeading({ title }: DexterHeadingProps) {
  return (
    <>
      <h2
        className="text-md bg-gradient-to-r from-dexter-gradient-blue to-dexter-gradient-green to-80% bg-clip-text text-transparent font-base"
        style={{
          margin: 0,
          marginBottom: "20px",
          marginTop: "0px",
          fontSize: "38px",
        }}
      >
        {title}
      </h2>
    </>
  );
}

function DexterParagraph({ text, additionalClass }: DexterParagraphProps) {
  const t = useTranslations();
  return (
    <p
      className={
        "text-sm tracking-wide py-2 " + (additionalClass ? additionalClass : "")
      }
    >
      {t(text)}
    </p>
  );
}

/*
 * Content for each section (except hero section)
 * is stored in the following functions
 */
function getTopicsSectionProps(
  topicSectionEnum: TopicSectionEnum,
  t: (key: string) => string
): TopicSectionProps {
  return {
    TOKENOMICS: getTokenomicsTopicSectionProps(t),
    TRADE: getTradeTopicSectionProps(t),
    STAKE: getStakeTopicSectionProps(t),
    CONTRIBUTE: getContributeTopicSectionProps(t),
  }[topicSectionEnum];
}

function getTokenomicsTopicSectionProps(
  t: (key: string) => string // translation dict needs to be passed in
): TopicSectionProps {
  const tokenomicsBody = (
    <>
      <IconTitleAndBody
        icon="money"
        title={t("tokenomics")}
        body={t("100k_dextr_minted_every_2")}
      />
      <IconTitleAndBody
        icon="vote"
        title={t("vote_in_the_dao")}
        body={t("1_dextr_equals_1_vote")}
      />
      <IconTitleAndBody
        icon="chart"
        title={t("revenue_share_coming_soon")}
        body={t("trade_fees_collected_by_dexter")}
      />
    </>
  );
  return {
    backgroundColor: "bg-dexter-grey-dark",
    title: t("dextr_token"),
    body: tokenomicsBody,
    imageUrl: "/landing/sections/dexter-mascotte-holding-coin.png",
    buttonUrl:
      "https://dexter-on-radix.gitbook.io/dexter/overview/how-are-contributors-rewarded/tokenomics",
    buttonText: t("learn_more"),
    reversed: true,
  };
}

function getTradeTopicSectionProps(
  t: (key: string) => string // translation dict needs to be passed in
): TopicSectionProps {
  return {
    backgroundColor: "bg-dexter-grey-light",
    title: t("earn_rewards_by_trading"),
    body: <DexterParagraph text={t("earn_rewards_by_trading_and")} />,
    imageUrl: "/landing/sections/treasury-earn-by-trading.png",
    buttonText: t("learn_more"),
    buttonUrl:
      "https://dexter-on-radix.gitbook.io/dexter/overview/how-are-contributors-rewarded/liquidity-incentives",
    reversed: false,
  };
}

function getStakeTopicSectionProps(
  t: (key: string) => string // translation dict needs to be passed in
): TopicSectionProps {
  return {
    backgroundColor: "bg-dexter-grey-dark",
    title: t("stake_xrd_to_earn_dextr"),
    body: <DexterParagraph text={t("delegate_your_xrd_to_our")} />,
    imageUrl: "/landing/sections/staking-safe.png",
    buttonText: t("stake_now"),
    buttonUrl:
      "https://dashboard.radixdlt.com/network-staking/validator_rdx1s0sr7xsr286jwffkkcwz8ffnkjlhc7h594xk5gvamtr8xqxr23a99a",
    reversed: true,
  };
}

function getContributeTopicSectionProps(
  t: (key: string) => string // translation dict needs to be passed in
): TopicSectionProps {
  return {
    backgroundColor: "bg-dexter-grey-light",
    title: t("earn_dextr_by_contributing"),
    body: <DexterParagraph text={t("whether_you_are_a_developer")} />,
    imageUrl: "/landing/sections/hands.png",
    buttonText: t("join_us"),
    buttonUrl:
      "https://dexter-on-radix.gitbook.io/dexter/overview/how-do-i-contribute",
    reversed: false,
  };
}
