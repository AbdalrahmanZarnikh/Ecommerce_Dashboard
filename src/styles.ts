const styles = {
  heading: "font-[700] text-dimBlack sm:text-[58px] text-[38px] ",
  paragraph: "font-[500] text-Grey_20 sm:text-[20px] text-[16px] ",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-[3.13rem] px-4",
  paddingY: "sm:py-[6.3rem] py-10",

  marginX: "sm:mx-[3.13rem] mx-4",
  marginY: "sm:my-[6.3rem] my-10",

  cardStyle:
    "border-2 border-Grey_15 bg-white rounded-xl md:shadow-custom-lg shadow-custom-md shadow-black",
};

export const layout = {
  cardContainer: "flex flex-row flex-wrap items-center justify-center",
  section: `flex ${styles.paddingY} ${styles.paddingX}`,
};

export default styles;
