import { Zap, BrainCircuit, Users } from "lucide-react";

const features = [
  {
    title: "Fast Assistance",
    description:
      "Submit healthcare support requests quickly and efficiently.",
    icon: Zap,
  },
  {
    title: "AI-Powered Request Analysis",
    description:
      "Gemini AI automatically summarizes and prioritizes requests.",
    icon: BrainCircuit,
  },
  {
    title: "Volunteer Network",
    description:
      "Connect with verified volunteers ready to help.",
    icon: Users,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Empowering Care Through Technology
          </h2>

          <p className="mt-4 text-gray-600">
            Combining human empathy with AI-powered efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <feature.icon
                className="text-blue-600 mb-4"
                size={32}
              />

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;