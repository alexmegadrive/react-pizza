import { FC } from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton: FC = (props: any) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="8" y="262" rx="3" ry="3" width="246" height="26" />
    <circle cx="126" cy="114" r="113" />
    <rect x="10" y="386" rx="3" ry="3" width="115" height="35" />
    <rect x="9" y="313" rx="3" ry="3" width="246" height="49" />
    <rect x="145" y="386" rx="3" ry="3" width="109" height="35" />
  </ContentLoader>
);

export default PizzaSkeleton;
