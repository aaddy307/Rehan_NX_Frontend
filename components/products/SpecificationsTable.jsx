export default function SpecificationsTable({ specifications }) {
  if (!specifications || specifications.length === 0) {
    return null
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-3 font-medium text-gray-700 w-1/3">{spec.key}</td>
              <td className="px-4 py-3 text-gray-600">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}