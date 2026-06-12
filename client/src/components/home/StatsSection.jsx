import {
Users,
HeartHandshake,
ClipboardCheck,
} from "lucide-react";

const stats = [
{
title: "Total Requests Processed",
value: "12,450+",
icon: ClipboardCheck,
},
{
title: "Lives Impacted",
value: "8,200+",
icon: HeartHandshake,
},
{
title: "Active Volunteers",
value: "1,150",
icon: Users,
},
];

const StatsSection = () => {
return ( <section className="-mt-12 relative z-10"> <div className="max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-3 gap-6">

      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              {item.title}
            </p>

            <item.icon
              size={28}
              className="text-blue-600"
            />
          </div>

          <h3 className="text-4xl font-bold mt-4 text-blue-600">
            {item.value}
          </h3>
        </div>
      ))}

    </div>

  </div>
</section>

);
};

export default StatsSection;
