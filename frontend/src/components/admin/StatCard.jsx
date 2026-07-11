export default function StatCard({ title, value, icon, trend, trendType }) {
  return (
    <div className="stat-card">
      <div className="stat-card-details">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-value">{value}</span>
        {trend && (
          <span className={`stat-card-trend ${trendType === 'down' ? 'down' : 'up'}`}>
            {trendType === 'down' ? '↓' : '↑'} {trend}
          </span>
        )}
      </div>
      <div className="stat-card-icon">
        {icon}
      </div>
    </div>
  );
}
