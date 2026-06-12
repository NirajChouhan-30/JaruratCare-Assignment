import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboard.service";
import { getSupportRequests } from "../services/support.service";
import { getVolunteers } from "../services/volunteer.service";
import { assignVolunteer } from "../services/assignment.service";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
const [stats, setStats] = useState(null);
const [requests, setRequests] = useState([]);
const [volunteers, setVolunteers] = useState([]);
const [selectedRequest, setSelectedRequest] =
useState(null);
const [selectedVolunteer, setSelectedVolunteer] =
  useState("");
const navigate = useNavigate();

useEffect(() => {
const fetchData = async () => {
try {
const [
statsResponse,
requestsResponse,
volunteersResponse,
] = await Promise.all([
getDashboardStats(),
getSupportRequests(),
getVolunteers(),
]);

    setStats(statsResponse.data);
    setRequests(requestsResponse.data);
    setVolunteers(volunteersResponse.data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();

}, []);

if (!stats) {
return ( <div className="text-center py-20">
Loading Dashboard... </div>
);
}

const handleAssignVolunteer = async () => {
  try {
    if (!selectedVolunteer) {
      toast.error(
        "Please select a volunteer"
      );
      return;
    }

    await assignVolunteer(
      selectedRequest._id,
      selectedVolunteer
    );

    toast.success(
      "Volunteer assigned successfully"
    );

    window.location.reload();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Assignment failed"
    );
  }
};

return ( <div className="max-w-7xl mx-auto px-6 py-12"> <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-4xl font-bold">
      NGO Dashboard
    </h1>

    <p className="text-gray-500 mt-1">
      Manage support requests and volunteers
    </p>
  </div>

 <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    toast.success("Logged out");

    navigate("/login");
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition"
>
  Logout
</button>
</div>

  {/* Stats */}
  <div className="grid md:grid-cols-4 gap-6 mb-10">
    <StatCard
      title="Total Requests"
      value={stats.totalRequests}
    />

    <StatCard
      title="Volunteers"
      value={stats.totalVolunteers}
    />

    <StatCard
      title="High Priority"
      value={stats.highPriorityCases}
    />

    <StatCard
      title="Today's Requests"
      value={stats.todayRequests}
    />
  </div>

  {/* Requests */}
  <div className="bg-white border rounded-2xl p-6 mb-10 shadow-sm">
    <h2 className="text-2xl font-semibold mb-4">
      Support Requests
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Patient
            </th>

            <th className="text-left py-3">
              AI Summary
            </th>

            <th className="text-left py-3">
              Priority
            </th>

            <th className="text-left py-3">
              Category
            </th>

            <th className="text-left py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr
              key={request._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3">
                {request.name}
              </td>

              <td className="py-3 max-w-xs">
                <p className="truncate">
                  {request.aiSummary}
                </p>
              </td>

              <td className="py-3">
                <PriorityBadge
                  priority={request.priority}
                />
              </td>

              <td className="py-3">
                {request.category}
              </td>

              <td className="py-3">
                <button
                  onClick={() =>
                    setSelectedRequest(
                      request
                    )
                  }
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Volunteers */}
  <div className="bg-white border rounded-2xl p-6 shadow-sm">
    <h2 className="text-2xl font-semibold mb-4">
      Volunteers
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Name
            </th>

            <th className="text-left py-3">
              City
            </th>

            <th className="text-left py-3">
              Availability
            </th>

            <th className="text-left py-3">
              Skills
            </th>
          </tr>
        </thead>

        <tbody>
          {volunteers.map((volunteer) => (
            <tr
              key={volunteer._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3">
                {volunteer.name}
              </td>

              <td className="py-3">
                {volunteer.city}
              </td>

              <td className="py-3">
                {volunteer.availability}
              </td>

              <td className="py-3">
                {volunteer.skills.join(
                  ", "
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

 <RequestModal
  request={selectedRequest}
  volunteers={volunteers}
  selectedVolunteer={selectedVolunteer}
  setSelectedVolunteer={
    setSelectedVolunteer
  }
  handleAssignVolunteer={
    handleAssignVolunteer
  }
  onClose={() =>
    setSelectedRequest(null)
  }
/>
</div>

);
};

const StatCard = ({ title, value }) => (

  <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
    <h3 className="text-gray-500 text-sm">
      {title}
    </h3>

<p className="text-4xl font-bold mt-3 text-blue-600">
  {value}
</p>

  </div>
);

const PriorityBadge = ({ priority }) => {
const styles = {
High: "bg-red-100 text-red-700",
Medium:
"bg-yellow-100 text-yellow-700",
Low: "bg-green-100 text-green-700",
};

return (
<span
className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[priority]}`}
>
{priority} </span>
);
};

const RequestModal = ({
 request,
  volunteers,
  selectedVolunteer,
  setSelectedVolunteer,
  handleAssignVolunteer,
  onClose,
}) => {
if (!request) return null;

return ( <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"> <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-xl">

    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold">
        AI Analysis
      </h2>

      <button
        onClick={onClose}
        className="text-xl"
      >
        ✕
      </button>
    </div>

    <div className="space-y-5">

      <div>
        <p className="text-gray-500">
          Patient
        </p>

        <p className="font-semibold">
          {request.name}
        </p>
      </div>

      <div>
        <p className="text-gray-500">
          AI Summary
        </p>

        <p>{request.aiSummary}</p>
      </div>

      <div>
        <p className="text-gray-500">
          Priority
        </p>

        <PriorityBadge
          priority={request.priority}
        />
      </div>

      <div>
        <p className="text-gray-500">
          Category
        </p>

        <p>{request.category}</p>
      </div>

      <div>
        <p className="text-gray-500">
          Recommended Action
        </p>

        <p>
          {request.recommendedAction}
        </p>
        <div className="mt-6">
  <label className="block font-semibold mb-2">
    Assign Volunteer
  </label>

  <select
    value={selectedVolunteer}
    onChange={(e) =>
      setSelectedVolunteer(
        e.target.value
      )
    }
    className="w-full border rounded-xl p-3"
  >
    <option value="">
      Select Volunteer
    </option>

    {volunteers.map((volunteer) => (
      <option
        key={volunteer._id}
        value={volunteer._id}
      >
        {volunteer.name} •{" "}
        {volunteer.city}
      </option>
    ))}
  </select>

  <button
    onClick={handleAssignVolunteer}
    className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
  >
    Assign Volunteer
  </button>
</div>

{request.assignedVolunteer && (
  <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-xl">
    <p>
      <strong>
        Assigned Volunteer:
      </strong>{" "}
      {request.assignedVolunteer.name}
    </p>

    <p className="text-sm text-gray-600">
      {request.assignedVolunteer.phone}
    </p>
  </div>
)}
      </div>

    </div>
  </div>
</div>



);
};

export default DashboardPage;
