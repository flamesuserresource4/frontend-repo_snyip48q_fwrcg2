import { useEffect, useState } from 'react'

export default function TasksOverview() {
  const [data, setData] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/maintenance-tasks`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        setData(null)
      }
    }
    load()
  }, [baseUrl])

  if (!data) return null

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Scope of Preventive Maintenance</h2>
      <p className="text-gray-700">{data.scope}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {data.tasks?.map((t) => (
          <div key={t.category} className="border border-gray-200 rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-gray-900">{t.category}</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              {t.items.map((i) => (<li key={i}>{i}</li>))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">Recommended Intervals</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
          {data.interval_guidance?.map((g) => (
            <li key={g.interval}><span className="font-medium">{g.interval}:</span> {g.recommended.join('; ')}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
