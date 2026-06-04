import Link from 'next/link'

export default function EmptyState({
  icon: Icon,
  message,
  actionLabel,
  actionHref,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <p className="text-gray-500 text-lg text-center mb-4">{message}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}