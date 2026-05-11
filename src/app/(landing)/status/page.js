import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "System Status — Crownledger",
  description: "Real-time status of all Crownledger services and systems.",
};

export default function StatusPage() {
  const overallStatus = "operational";

  const services = [
    {
      name: "Banking API",
      description: "Core banking infrastructure and transaction processing",
      status: "operational",
      uptime: "99.99%",
    },
    {
      name: "Authentication",
      description: "Login, signup, and session management",
      status: "operational",
      uptime: "100%",
    },
    {
      name: "Money Transfers",
      description: "ACH and wire transfer processing",
      status: "operational",
      uptime: "99.97%",
    },
    {
      name: "Card Services",
      description: "Debit card processing and management",
      status: "operational",
      uptime: "99.98%",
    },
    {
      name: "Mobile App",
      description: "iOS and Android mobile applications",
      status: "operational",
      uptime: "99.95%",
    },
    {
      name: "Web Dashboard",
      description: "Online banking portal and account management",
      status: "operational",
      uptime: "99.99%",
    },
    {
      name: "Notifications",
      description: "Push notifications, email, and SMS alerts",
      status: "operational",
      uptime: "99.92%",
    },
    {
      name: "Customer Support",
      description: "Live chat and support ticket system",
      status: "operational",
      uptime: "99.90%",
    },
  ];

  const incidents = [
    {
      date: "April 28, 2026",
      title: "Delayed Transfer Notifications",
      status: "resolved",
      duration: "23 minutes",
      description: "Some users experienced delayed push notifications for completed transfers. The issue was caused by a temporary overload on our notification service and was resolved without any transaction data loss.",
    },
    {
      date: "March 15, 2026",
      title: "Intermittent Login Issues",
      status: "resolved",
      duration: "11 minutes",
      description: "A subset of users experienced difficulty logging in due to a configuration change in our authentication service. The change was rolled back and all users regained access within 11 minutes.",
    },
    {
      date: "February 3, 2026",
      title: "Scheduled Maintenance",
      status: "completed",
      duration: "2 hours",
      description: "Planned maintenance window for database upgrades and infrastructure improvements. All services were restored ahead of schedule.",
    },
  ];

  const metrics = [
    { label: "API Response Time", value: "142ms", status: "good" },
    { label: "Transaction Success Rate", value: "99.98%", status: "good" },
    { label: "Uptime (30 days)", value: "99.97%", status: "good" },
    { label: "Active Incidents", value: "0", status: "good" },
  ];

  const statusConfig = {
    operational: {
      label: "Operational",
      color: "text-green-600",
      bg: "bg-green-50",
      dot: "bg-green-500",
      border: "border-green-100",
    },
    degraded: {
      label: "Degraded",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      dot: "bg-yellow-500",
      border: "border-yellow-100",
    },
    outage: {
      label: "Outage",
      color: "text-red-600",
      bg: "bg-red-50",
      dot: "bg-red-500",
      border: "border-red-100",
    },
    resolved: {
      label: "Resolved",
      color: "text-green-600",
      bg: "bg-green-50",
      dot: "bg-green-500",
      border: "border-green-100",
    },
    completed: {
      label: "Completed",
      color: "text-blue-600",
      bg: "bg-blue-50",
      dot: "bg-blue-500",
      border: "border-blue-100",
    },
  };

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className={`py-20 px-6 ${overallStatus === "operational" ? "bg-gradient-to-br from-green-50 via-white to-white" : "bg-gradient-to-br from-red-50 via-white to-white"}`}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              System Status
            </p>

            {/* Overall status badge */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border mb-6
              ${overallStatus === "operational"
                ? "bg-green-50 border-green-100"
                : "bg-red-50 border-red-100"
              }`}>
              <div className={`w-3 h-3 rounded-full animate-pulse ${overallStatus === "operational" ? "bg-green-500" : "bg-red-500"}`} />
              <span
                className={`text-lg font-bold ${overallStatus === "operational" ? "text-green-700" : "text-red-700"}`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {overallStatus === "operational" ? "All Systems Operational" : "Service Disruption Detected"}
              </span>
            </div>

            <h1
              className="text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Crownledger System Status
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Real-time status and uptime information for all Crownledger
              services. Last updated: May 11, 2026 at 9:00 AM EST.
            </p>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-12 px-6 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 text-center">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
                  {metric.label}
                </p>
                <p
                  className="text-3xl font-bold text-green-600 mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {metric.value}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-green-600 font-medium">Normal</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Services
              </p>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Service Status
              </h2>
            </div>

            <div className="space-y-3">
              {services.map((service, i) => {
                const config = statusConfig[service.status];
                return (
                  <div
                    key={i}
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 rounded-2xl border ${config.border} ${config.bg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${config.dot} ${service.status === "operational" ? "animate-pulse" : ""}`} />
                      <div>
                        <p
                          className="text-sm font-bold text-gray-900"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-500">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0 ml-7 sm:ml-0">
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-0.5">Uptime (30d)</p>
                        <p className="text-xs font-bold text-gray-700">{service.uptime}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${config.bg} ${config.color} border ${config.border}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Uptime chart — visual bars */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Availability
              </p>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                90-Day Uptime History
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
              {services.slice(0, 4).map((service, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {service.name}
                    </p>
                    <p className="text-xs font-bold text-green-600">{service.uptime} uptime</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 90 }).map((_, j) => {
                      const isIncident = (i === 0 && j === 12) || (i === 1 && j === 45);
                      return (
                        <div
                          key={j}
                          className={`flex-1 h-6 rounded-sm ${isIncident ? "bg-yellow-400" : "bg-green-500"}`}
                          title={isIncident ? "Incident" : "Operational"}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">90 days ago</span>
                    <span className="text-xs text-gray-400">Today</span>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-green-500" />
                  <span className="text-xs text-gray-500">Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-yellow-400" />
                  <span className="text-xs text-gray-500">Incident</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-red-500" />
                  <span className="text-xs text-gray-500">Outage</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Incident history */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                History
              </p>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Past Incidents
              </h2>
            </div>

            <div className="space-y-4">
              {incidents.map((incident, i) => {
                const config = statusConfig[incident.status];
                return (
                  <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${config.bg} ${config.color} border ${config.border}`}>
                          {config.label}
                        </span>
                        <h3
                          className="text-sm font-bold text-gray-900"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {incident.title}
                        </h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400">{incident.date}</p>
                        <p className="text-xs font-semibold text-gray-500 mt-0.5">
                          Duration: {incident.duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {incident.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                No incidents in the last 30 days before the above events.
              </p>
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-16 px-6 bg-blue-600">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Subscribe to status updates
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Get notified immediately when there's an incident or maintenance
              window affecting Crownledger services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-blue-500 bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:border-white transition text-sm"
              />
              <button
                className="bg-white text-blue-600 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition whitespace-nowrap"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}