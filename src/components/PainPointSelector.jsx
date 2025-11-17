import { useEffect, useState } from 'react'

export default function PainPointSelector({ onSelectedChange }) {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchPainPoints = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/pain-points`)
        const data = await res.json()
        setOptions(data.pain_points || [])
      } catch (e) {
        setOptions([])
      }
    }
    fetchPainPoints()
  }, [baseUrl])

  useEffect(() => {
    onSelectedChange?.(selected)
  }, [selected, onSelectedChange])

  const toggle = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Which challenges are you facing?</h2>
        <p className="text-gray-600">Select all that apply. We will tailor our preventive maintenance to address them.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((p) => (
          <button
            key={p}
            onClick={() => toggle(p)}
            className={`text-left border rounded-lg p-3 transition-colors ${selected.includes(p) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <span className="block text-gray-800">{p}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
