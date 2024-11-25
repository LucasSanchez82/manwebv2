import FeatureCard from "./FeatureCard";
import { featuresContent } from "./constant";

const Feature = () => {
  return (
    <section className="container mx-auto flex  justify-center gap-10">
      {featuresContent.map(({ key, ...feat }) => (
        <FeatureCard key={key} {...feat} />
      ))}
    </section>
  );
};

export default Feature;
