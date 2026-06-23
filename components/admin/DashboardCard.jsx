export default function DashboardCard({ icon: Icon, count, label, color = 'accent' }) {
  const colors = {
    accent: 'bg-accent/10 text-accent',
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-500/10 text-green-500',
    blue: 'bg-blue-500/10 text-blue-500',
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col justify-between">
      <div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <p className="text-3xl font-extrabold text-primary mb-1">{count}</p>
      </div>
      <p className="text-gray-500 text-sm mt-2 font-medium">{label}</p>
    </div>
  )
}