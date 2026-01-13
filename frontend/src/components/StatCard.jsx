import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({
  title,
  value,
  icon: Icon,
  subtitle,
  badges = [],
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={`transition ${
        onClick ? "cursor-pointer hover:shadow-md hover:bg-muted/50" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-2xl font-bold">{value}</div>

        {/* Optional subtitle */}
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}

        {/* Optional badges */}
        {badges.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
